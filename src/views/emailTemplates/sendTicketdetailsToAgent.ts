const ticketDetailsToAgent = `

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
    </style>
</head>
<body>
    <div class="container">
        <h2>Dear Agent,</h2>
        <p>You have received a new ticket.</p>
        
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
        
        <p>Please review the ticket and take appropriate action.</p>
        
        <p>Thank you</p>
    </div>
</body>
</html>

`
export default ticketDetailsToAgent;

