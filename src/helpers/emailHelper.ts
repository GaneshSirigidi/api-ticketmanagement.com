

export const prepareTicketdetailsData = (ticketData: any) => {

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
    return { emailData, emailContent }

}

export const prepareAssignTicketdetailsData = (ticketData: any,user:any) => {

    const name = ticketData.requester;
    const emailData = {
        email: user.assigned_to,
        subject: ticketData.subject,
        name
    };
    const emailContent = {
        name,
        ...ticketData
    }
    return { emailData, emailContent }

}

const baseUrl = process.env.APP_URL

export const prepareForgotPasswordEmailData = (
    email: any,
    token: string,
    subject = "Forgot Password"
) => {

    const url = baseUrl + `/forget-password/verify-email?token=${token}`;

    const emailData = {
        email: email,
        subject,
    };

    const emailContent = {
        resetURL: url,
    };

    return { emailData, emailContent };
}
