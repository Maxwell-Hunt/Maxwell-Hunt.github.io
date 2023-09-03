function submitContact() {
    let nameElement = document.getElementById('name__input');
    let emailElement = document.getElementById('email__input');
    let messageElement = document.getElementById('message__input');
    let submission = {'name': nameElement.value, 'email': emailElement.value, 'message': messageElement.value}
    $.post('http://3.96.178.157:8080', JSON.stringify(submission),
    response => {
        console.log("Success!!!");
    });
    nameElement.value = '';
    emailElement.value = '';
    messageElement.value = '';
}