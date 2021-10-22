const allowed = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
                 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '@', '.',
                 'á', 'â', 'ã', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-',
                 '_', ';', ' '];
exports.sanitize = (data) => {
    if(typeof(data) != 'string' || data.length < 0)
        return false;
    const lowData = data.toLowerCase();

    for(let i = 0; i < lowData.length; i++)
        if(!allowed.includes(lowData.charAt(i)))
            return false;
    return true;
}