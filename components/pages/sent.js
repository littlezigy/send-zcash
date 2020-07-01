module.exports = function(receiver, amount) {
    return `
        <main id = 'page'>
            <h3>Thank you</h3>

            <h4>You just sent money to ${ receiver }</h4>
            <p>They will be notified immediately.</p>
            
        </main>
    `;
}
