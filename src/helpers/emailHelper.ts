

export const prepareTicketdetailsData = (ticketData:any)=>{

    const name = ticketData.requester;
    const emailData = {
        email: ticketData.email,
        subject: ticketData.subject,
        name
    };
    const emailContent = {
        name,
        ...ticketData
    }
    return{emailData,emailContent}

}