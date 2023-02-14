export var DefaultMailContext = {
    'title': 'Demo Title',
    'text': 'This text is for demonstration purposes.',
    'receiverName': '#userId.login',
    'senderName': '#user.login',
    'unsubscribeLink': '#app.unsubscribeLink'
};

export var DefaultMailHtml = '<!doctype html>\n' +
    '<html>\n' +
    '\n' +
    '<head>\n' +
    '  <meta name="viewport" content="width=device-width"/>\n' +
    '  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>\n' +
    '  <title>{{title}}</title>\n' +
    '  <style>\n' +
    '\n' +
    '    \n' +
    '    body {\n' +
    '      background-color: #D3D3D3;\n' +
    '      font-family: sans-serif;\n' +
    '      font-size: 14px;\n' +
    '      line-height: 1.4;\n' +
    '      margin: 0;\n' +
    '      padding: 0;\n' +
    '      -ms-text-size-adjust: 100%;\n' +
    '      -webkit-text-size-adjust: 100%;\n' +
    '    }\n' +
    '\n' +
    '\n' +
    '\n' +
    '    .body {\n' +
    '      background-color: #D3D3D3;\n' +
    '      color:#222222;\n' +
    '      width: 100%;\n' +
    '      padding: 20px\n' +
    '    }\n' +
    '    \n' +
    '    a{\n' +
    '      color: #000000;\n' +
    '    }\n' +
    '\n' +
    '    .container {\n' +
    '      display: block;\n' +
    '      margin: 0 auto !important;\n' +
    '      max-width: 420px;\n' +
    '    }\n' +
    '\n' +
    '    .content {\n' +
    '      box-sizing: border-box;\n' +
    '      display: block;\n' +
    '      margin: 0 auto;\n' +
    '      max-width:420px;\n' +
    '    }\n' +
    '\n' +
    '  </style>\n' +
    '</head>\n' +
    '\n' +
    '<body class="">\n' +
    '<table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">\n' +
    '  <tr>\n' +
    '    <td>&nbsp;</td>\n' +
    '    <td class="container">\n' +
    '      <div class="content">\n' +
    '        <table role="presentation" class="main">\n' +
    '          <tr>\n' +
    '            <td class="wrapper">\n' +
    '              <table role="presentation" border="0" cellpadding="0" cellspacing="0">\n' +
    '                <tr>\n' +
    '                  <td>\n' +
    '                    <h1>{{title}}</h1>\n' +
    '                    <b>Hi {{receiverName}},</b>\n' +
    '                    <p>{{text}}</p>\n' +
    '                    <p>BR, <br>{{senderName}}</p>\n' +
    '                  </td>\n' +
    '                </tr>\n' +
    '              </table>\n' +
    '            </td>\n' +
    '          </tr>\n' +
    '        </table>\n' +
    '        <div class="footer">\n' +
    '          <table role="presentation" border="0" cellpadding="0" cellspacing="0">\n' +
    '            <tr>\n' +
    '              <td class="content-block">\n' +
    '                <br> Don\'t like these emails? <a href="{{unsubscribeLink}}">Unsubscribe</a>.\n' +
    '              </td>\n' +
    '            </tr>\n' +
    '          </table>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '    </td>\n' +
    '  </tr>\n' +
    '</table>\n' +
    '</body>\n' +
    '</html>';


