/* eslint-disable no-console */
import { MAIL_ADDRESS, MAIL_PASSWORD } from 'config/config'
import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import path from 'path'

type Data = {
  status: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): void {
  const body = JSON.parse(req.body)

  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: MAIL_ADDRESS,
      pass: MAIL_PASSWORD
    },
    secure: true,
  })

  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve('pages/api/templates'),
      defaultLayout: false
    },
    viewPath: path.resolve('pages/api/templates'),
    extName: ".handlebars"
  }

  transporter.use('compile', hbs(handlebarOptions as hbs.NodemailerExpressHandlebarsOptions))

  const mailOptions = {
    from: MAIL_ADDRESS,
    to: 'shadooowpl@gmail.com',
    subject: `Wiadomość od ${body.name}`,
    template: 'message',
    context: {
      name: body.name,
      message: body.message,
      email: body.email
    },
    attachments: [{
      filename: 'logo-enubes-pl.png',
      path: 'pages/api/templates/images/logo-enubes-pl.png',
      cid: 'logo-white'
    }, {
      filename: 'info-image.png',
      path: 'pages/api/templates/images/info-image.png',
      cid: 'info-img'
    }, {
      filename: 'footer.png',
      path: 'pages/api/templates/images/footer.png',
      cid: 'footer-img'
    }, {
      filename: 'logo-enubes-white.png',
      path: 'pages/api/templates/images/logo-enubes-white.png',
      cid: 'logo-white-new'
    }, {
      filename: 'facebook2x.png',
      path: 'pages/api/templates/images/facebook2x.png',
      cid: 'facebook-icon'
    }, {
      filename: 'instagram2x.png',
      path: 'pages/api/templates/images/instagram2x.png',
      cid: 'instagram-icon'
    }, {
      filename: 'youtube2x.png',
      path: 'pages/api/templates/images/youtube2x.png',
      cid: 'youtube-icon'
    }]
  }

  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info)
  })

  res.status(200).end()
}
