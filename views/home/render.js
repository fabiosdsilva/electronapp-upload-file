const btn = document.getElementById('btn');

btn.addEventListener('click', async (e) => {
    e.preventDefault()
    const fileOpen = await window.dialog.openFile();

    const file = await window.filePath.file(fileOpen);
    console.log(file);
});