module.exports = (content, title) => {
    return `
        <!DOCTYPE html>
        <html lang = 'en'>
            <head>
                <meta name="viewport" content="width=device-width,initial-scale=1.0">
                <link rel="icon" href="favicon.ico">
                <link rel = 'stylesheet' href = '/style.css'>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <title>${ title } | Send ZCash</title>
            </head>

            <body>
                <h1>Send ZCash</h1>
                ${ content }
            </body>
        </html>
    `;
}
