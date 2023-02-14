import { HierarchyNode } from 'd3';
import { D3TreeChartComponent } from '../components/d3-tree-chart/d3-tree-chart.component';

export class TreeNode {

  children: any [] = [];
  _children?: any [];
  selected = false;
  isOpen = false;
  focused = false;
  private childrenVisible = false;
  private added = false;
  hidden = false;
  dataEntries: any[] = [];
  name?: string;

  radius = {
    button: 10,
    default: 10,
    selected: 20
  }

  x = 0;
  y = 0;
  x0 = 0;
  y0 = 0;

  height = 0;

  index = 0;
  layer = 0;

  node: any;
  nodes?: HierarchyNode<any>[];


  circle?: any;
  text?: any;
  link?: any;
  buttons?: any;

  classNames = ['node'];
  className = 'node';

  options: any = {
    add: {
      color: '#00ff00',
      caption: '+',
      fontSize: 14,
      x: this.radius.selected + this.radius.button,
      y: this.radius.selected + this.radius.button,
      button: (undefined as any | undefined),
      text: (undefined as any | undefined),
      event: () => {
        this.chartComponent.addNewEntry(this.data);
      },
    }
  };
  private preventClick = false;
  private clickTimeout?: any;

  constructor(private chartComponent: D3TreeChartComponent, public data?: any, public primaryKey = 'id', public parentKey = 'parentId', public nameKey = 'name', public  parent?: TreeNode, dataEntries: any[] = []) {

    this.setData(dataEntries);
  }

  init(open = false) {
    if (!this.node && this.chartComponent.chart) {
      const x = this.parent ? this.parent.x : this.x;
      const y = this.parent ? this.parent.y : this.y;
      this.node = this.chartComponent.chart.wrapper.append("g")
        .attr("class", this.className)
        .attr("transform", () => {
          return "translate(" + x + "," + y + ")";
        })
        .attr("pointerEvents", "none")
        .attr("opacity", 0)
        .on("click", (e: any) => {
          e.stopPropagation();
          e.preventDefault();
          this.clickTimeout = setTimeout(() => {
            if (!this.preventClick) {
              this.click();
            }
          }, 100);
        });

      if (this.chartComponent.treeRoot) {
        this.nodes = this.chartComponent.treeRoot.descendants();
      }
      this.circle = this.node.append("circle")
        .attr("r", () => {
          return this.radius.default;
        });
      if (this.name) {
        this.text = this.node.append("text")
          .attr("text-anchor", () => {
            return "middle";
          })
          .text(() => {
            return this.data[this.nameKey] || this.data[this.primaryKey] || this.name;
          })
          .attr("pointerEvents", "none")
          .style("fill-opacity", 0);
      }
      if (this.parent) {
        this.link = this.chartComponent.chart.wrapper.insert("path", "g")
          .attr("class", "link")
          .attr("pointerEvents", "none")
          .attr("d", () => {
            return this.diagonal({source: this.parent, target: this.parent});
          });


      }
      this.buttons = this.node.append("g")
        .attr("class", "options")
        .attr("transform", () => {
          return "translate(" + 0 + "," + -this.radius.default + ")";
        })
        .attr("pointerEvents", "none")
        .attr("opacity", 0);
      this.initOptions();

      this.added = true;
    }
    this.show();
    if (open) {
      this.open();
      this.initChildren();
    }
  }

  initOptions() {
    for (const key in this.options) {
      this.options[key].button = this.buttons.append("circle")
        .attr("class", "option-circle pointer")
        .attr("fillColor", this.options[key].color || '#cccccc')
        .attr("r", () => {
          return this.radius.button;
        }).attr("transform", () => {
          return "translate(" + this.options[key].x + "," + this.options[key].y + ")";
        }).on("click", (e: any) => {
          e.stopPropagation();
          e.preventDefault();
          if (this.clickTimeout) {
            clearTimeout(this.clickTimeout)
          }
          this.preventClick = true;
          this.options[key].event();
          this.chartComponent?.updateChart();
          this.clickTimeout = setTimeout(() => {
            this.preventClick = false;
          }, 150);
        });
      this.options[key].button.text = this.buttons.append("text")
        .attr("class", "option-text pointer")
        .attr("x", () => {
          return this.options[key].x;
        })
        .attr("y", () => {
          return this.options[key].y + this.radius.button / 2;
        })
        .attr("font-size", this.options[key].fontSize + 'px')
        .attr("text-anchor", "middle")
        .text(() => {
          return this.options[key].caption;
        })
        .on("click", () => {
          this.options[key].event()
        })
        .style("fill-opacity", 0);
    }

  }

  update() {
    this.name = this.data && this.data[this.nameKey] ? this.data[this.nameKey] : this.data[this.primaryKey] || this.name;
    this.index = this.parent ? this.parent.childIndex(this) : 0;
    this.layer = this.parent ? this.parent.layer + 1 : 0;
    this.height = this.children.length ? this.chartComponent.spaceY * (this.children.length - 1) : this.radius.default;
    this.x = this.chartComponent.spaceX * this.layer;
    this.y = (this.parent ? this.chartComponent.spaceY * this.index : 0) + (this.parent ? this.parent.data?.id ? this.parent.y : 0 : 0);
    if (this.parent) {
      this.y -= (this.parent.height / 2);
    }
    this.x0 = (this.parent && this.parent.data?.id ? this.parent.x : 0);
    this.y0 = (this.parent && this.parent.data?.id ? this.parent.y : 0);
    if (this.hidden) {
      this.addClass('hidden');
    } else {
      this.removeClass('hidden');
    }
    if (this.isOpen) {
      this.addClass('open');
    } else {
      this.removeClass('open');
    }
    if (this.selected) {
      this.addClass('selected');
    } else {
      this.removeClass('selected');
    }
    if (this.focused) {
      this.addClass('focused');
    } else {
      this.removeClass('focused');
    }
    if (this.children.length) {
      this.addClass('children');
    } else {
      this.removeClass('children');
    }
    this.updateElements();
  }

  show() {
    if (!this.added) {
      this.init();
    } else {
      this.hidden = false;
      this.update();
    }
  }

  hide() {
    this.hidden = true;
    this.hideChildren();
    this.update();
  }


  updateElements() {
    if (this.node) {
      this.node.transition()
        .duration(this.chartComponent.animationDuration)
        .attr("transform", () => {
          return "translate(" + (this.hidden ? this.x0 : this.x) + "," + (this.hidden ? this.y0 : this.y) + ")";
        })
        .attr("pointerEvents", (this.hidden ? 'none' : 'all'))
        .attr("opacity", (this.hidden ? 0 : 1));
    }
    if (this.link) {
      this.link.transition()
        .duration(this.chartComponent.animationDuration)
        .attr("d", () => {
          return this.diagonal({source: this.parent, target: (this.hidden ? this.parent : this)});
        })
        .attr("pointerEvents", "all");
    }
    if (this.text) {
      this.text.transition()
        .duration(this.chartComponent.animationDuration)
        .attr("x", () => {
          return 0;
        })
        .attr("y", () => {
          return -(this.hidden ? 0 : (this.selected ? this.radius.selected : this.radius.default) + 5);
        })
        .attr("pointerEvents", (this.hidden ? 'none' : 'all'))
        .attr("opacity", (this.hidden ? 0 : 1));
    }

    if (this.circle) {
      this.circle.transition()
        .duration(this.chartComponent.animationDuration)
        .attr("r", this.selected ? this.radius.selected : this.radius.default)
        .attr("class", (d: any) => {
          return this.children.length ? "children" : "no-children";
        });
    }
    if (this.focused) {
      if (this.buttons) {
        this.buttons.transition()
          .duration(this.chartComponent.animationDuration)
          .attr("pointerEvents", "all")
          .attr("opacity", 1);
      }
    } else {
      if (this.buttons) {
        this.buttons.transition()
          .duration(this.chartComponent.animationDuration)
          .attr("pointerEvents", "none")
          .attr("opacity", 0);
      }
    }
  }


  addClass(className: string) {
    if (!this.classNames.find(existingClassName => existingClassName === className)) {
      this.classNames.push(className);
    }
    this.setClassName();
  }

  removeClass(className: string) {
    for (let i = 0; i < this.classNames.length; i++) {
      if (this.classNames[i] === className) {
        this.classNames.splice(i, 1);
        return;
      }
    }
    this.setClassName();
  }

  private setClassName() {
    this.className = '';
    for (const className of this.classNames) {
      this.className += ' ' + className;
    }
    if (this.node) {
      this.node.attr("class", this.className);
    }
  }


  setData(dataEntries = this.dataEntries) {
    this.dataEntries = dataEntries;
    this.getName();
    this.loadChildren();
  }

  setChildren(children = this.children) {
    this.children = children;
    this.update();
  }


  click() {
    this.toggle();
    this.chartComponent?.updateChart();
  }

  toggle() {
    if (!this.hidden) {
      if (this.selected) {
        if (!this.focused) {
          this.focus();
        } else {
          if (!this.isOpen) {
            this.open();
          } else {
            this.close();
          }
        }
      } else {
        this.select(true);
        this.focus();
      }
    } else {
      this.show();
    }

  }


  select(unselectAll = false) {
    if (unselectAll) {
      this.unselectAll();
    }
    if (this.parent) {
      this.parent.select();
    }
    this.selected = true;
    this.update();
  }

  unselect() {
    this.unselectChildren();
    this.selected = false;
    this.focused = false;
    this.update();
  }

  open() {
    this.isOpen = true;
    this.showChildren();
    if (this.data?.id || this.data && this.data.id === 0) {
      this.chartComponent.addOpenId(this.data.id);
    }
    this.update();
  }

  close() {
    this.isOpen = false;
    this.hideChildren();
    if (this.data.id) {
      this.chartComponent.removeOpenId(this.data.id);
    }
    this.update();
  }

  closeAll() {
    for (const entry of this.dataEntries) {
      if (entry !== this.parent) {
        entry.close();
      }
    }
  }

  unselectAll() {
    for (const entry of this.dataEntries) {
      entry.unselect();
    }
  }

  unselectChildren() {
    for (const entry of this.children) {
      entry.unselect();
    }
  }

  focus() {
    this.unfocusAll();
    this.focused = true;
    this.chartComponent.chart.moveSvgTo(this.x, this.y);
    this.update();
  }

  unfocus() {
    this.focused = false;
    if (this.parent) {
      this.parent.unfocus();
    }
    this.update();
  }

  unfocusAll() {
    for (const entry of this.dataEntries) {
      entry.unfocus();
    }
  }

  private diagonal(d: any) {
    return "M" + d.source.x + "," + d.source.y
      + "C" + d.source.x + "," + (d.source.y + d.target.y) / 2
      + " " + d.target.x + "," + (d.source.y + d.target.y) / 2
      + " " + d.target.x + "," + d.target.y;
  }


  private loadChildren() {
    this.children = this.data && this.dataEntries ? this.dataEntries.filter(childEntry => childEntry.data && childEntry.data[this.parentKey] === this.data[this.primaryKey]).reverse() : [];
    for (const child of this.children) {
      child.parent = this;
      child.update();
    }
    this.update();
    return this.children;
  }

  private showChildren() {
    if (this.children) {
      for (const child of this.children) {
        child.show();
      }
    }
    this.childrenVisible = true;
  }

  private hideChildren() {
    if (this.children) {
      for (const child of this.children) {
        child.hide();
      }
    }
    this.childrenVisible = false;
  }

  public childIndex(child: any) {
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i] === child) {
        return i;
      }
    }
    return 0;
  }

  private initChildren() {
    if (this.children) {
      for (const child of this.children) {
        child.init();
      }
    }
  }

  private getName() {
    if (this.data && this.nameKey && this.data[this.nameKey]) {
      this.name = this.data[this.nameKey];
    }
  }
}
