//extracts repeatative store submission

function getUniqueListBy(data) {
    const ids = data.map(value => value[0].value)
    const filtered = data.filter((value, index) => !ids.includes(value[0].value, index + 1));
    return filtered;
}

module.exports={
    getUniqueListBy
}