async function submitTrue () {
    let checkbox = document.getElementById('checkbox').checked;

    const value = await window.settings.check(checkbox);
    
    return checkbox = value
}

document.getElementById('checkbox').checked = submitTrue()

async function submitFalse () {
    let checkbox = document.getElementById('checkboxx').checked;

    const value = await window.settings.check(checkbox);
    
    return checkbox = value
}

document.getElementById('checkboxx').checked = submitFalse()


