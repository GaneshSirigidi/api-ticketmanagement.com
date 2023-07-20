"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ticketDetailsToUser = `

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Ticket Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        
        h2 {
            color: #333;
        }
        
        p {
            margin-bottom: 10px;
        }
        
        .ticket-info {
            display: flex;
            align-items: flex-start;
        }
        
        .ticket-info p {
            margin: 0;
        }
        
        .ticket-info__label {
            width: 100px;
            font-weight: bold;
        }
        
        .ticket-info__content {
            margin-left: 10px;
        }
        
        .official-template {
            background-color: #f0f0f0;
            border: 2px solid #333;
            padding: 30px;
        }
        
        .official-template h2 {
            color: #333;
            font-size: 24px;
            margin-bottom: 20px;
        }
        
        .official-template p {
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
    <div class="container official-template">
        <h2>Dear User,</h2>
        <p>Your ticket submitted successfully.</p>
        
        <div class="ticket-info">
            <p class="ticket-info__label">Ticket ID:</p>
            <p class="ticket-info__content"><%=_doc.ticket_id %></p>
        </div>
        <div class="ticket-info">
            <p class="ticket-info__label">Subject:</p>
            <p class="ticket-info__content"><%=_doc.subject %></p>
        </div>
        <div class="ticket-info">
            <p class="ticket-info__label">Requester:</p>
            <p class="ticket-info__content"><%=_doc.requester %></p>
        </div>
        
        <p>Description: <%=_doc.requirement_brief %></p>
        
        <p>Thank you for submitting your ticket. Our team will analyze the issue and work towards resolving it as soon as possible. You will receive an email with further updates and resolution details. We appreciate your patience.</p>
    </div>
</body>
</html>
`;
exports.default = ticketDetailsToUser;
