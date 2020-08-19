const date = new Date();
module.exports.getDate = function(){
    const options = { 
        day: 'numeric',
        year: 'numeric',
        month: 'long'
    }

    return date.toLocaleDateString('en-US', options);
}

module.exports.getDay = function() {
    return date.toLocaleDateString('en-US', {weekday:'long'})
}

