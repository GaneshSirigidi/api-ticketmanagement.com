const forgotPasswordTemplate = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
  <head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title></title>
    <!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]-->
    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
    <!--[if !mso]><!-- -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet">
    <!--<![endif]-->

    <style>
      body {
        background: #cbe6f7;
      }
      table,
      td,
      th {
        border: 1px solid #000;
        border-collapse: collapse;
      }
      .email-template {
        max-width: 500px;
        margin: 0 auto;
        background: #fff;
        padding: 20px;
        height: 600px;
      }
      .email-template h1 {
        font-size: 18px;
        font-weight: normal;
      }
      .email-template p {
        margin-bottom: 0;
        margin-top: 8px;
      }
      .email-template table {
        width: 100%;
        border-collapse: collapse;
        border: 1px solid rgba(0, 0, 0, 0.2);
      }
      .email-template th {
        padding: 8px 10px;
        text-align: left;
        font-size: 14px;
      }
      .email-template td {
        padding: 8px 10px;
        font-size: 14px;
      }
      .email-template th,
      .email-template td {
        border-color: rgba(0, 0, 0, 0.2);
      }
      .email-template .table-view {
        margin-top: 30px;
      }
    </style>
  </head>
  <body>
    <div class="email-template">
      <p>Forgot your password?</p>
      <p>We received a request to reset the password to your account.</p>
      <p>click on the below button</p>
      <a href="<%= resetURL %>">Reset Password</a>
    </div>
  </body>
</html>`

export default forgotPasswordTemplate