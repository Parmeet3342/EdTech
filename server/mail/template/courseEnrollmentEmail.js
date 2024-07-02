exports.courseEnrollmentEmail = (courseName,name) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Course Reagistration Confirmation</title>
        <style>
            body{
                background-color: #fff;
                font-family: Arial, sans-serif;
                color: #333333;
                font-size: 16px;
                line-height: 1.4;
            }
    
            .container{
                max-width: 600px;
                margin: 0 auto;
                text-align: center;
                padding: 20px;
            }
    
            .logo{
                max-width: 200px;
                margin-bottom: 10px;
            }
    
            .body{
                font-size: 16px;
                margin-bottom: 10px;
            }
    
            .message{
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 10px;
            }
    
            .cta{
                border: none;
                padding: 10px 20px;
                font-size: 16px;
                font-weight: bold;
                background-color: #FFD60A;
                color: #000000 ;
                border-radius: 5px;
                margin-top: 20px;
                text-decoration: none;
            }
    
            .cta a{
                text-decoration: none;
            }
    
            .support{
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
           
        </style>
    </head>
    <body>
        <div class="container">
            <a href="https://studynotion-edtech-project.vercel.app">
                <img src="https://i.ibb.co/7Xyj3PC/logo.png"
                alt="StudyNotion Logo"
                class="logo"/>
            </a>
    
            <p class="message">Course Reagistration Confirmation</p>
    
            <div class="body">
                <p>Dear ${name}</p>
    
                <p>
                    You have successfully registered for the course ${courseName}.
                    We are excited to have you as a participant!
                </p>
    
                <p>
                    Please log in to your learning dashboard to access the course materials
                    and start your learning journey. 
                </p>
    
                <button class="cta">
                    <a href="https://studynotion-edtech-project.vercel.app/dashboard">
                        Go to DashBoard
                    </a>
                </button>
            </div>
    
            <div class="support">
                If you have any questions or need assistance, please feel free to reach out to us at 
                <a href="mailto:info@studynotion.com">info@studynotion.com</a>. We are here to help!
            </div>
        </div>
    </body>
    </html>`
}