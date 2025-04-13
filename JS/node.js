function mostrarPopup(id) {
    document.getElementById('popup'+ id).style.display = 'block';
    document.getElementById('overlay'+ id).style.display = 'block';
}

function cerrarPopup(id) {
    document.getElementById('popup'+ id).style.display = 'none';
    document.getElementById('overlay'+ id).style.display = 'none';
}



