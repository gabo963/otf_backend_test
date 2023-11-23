const migrationController = async (max, array, promise, other) => {
    const veces = Math.ceil(array.length / max);
    const promises = [];
    for (let i = 0; i < veces; i++) {
        let floor = i * max;
        let ceil = floor + max > array.length ? array.length : floor + max;
        promises.push(promise(array.slice(floor, ceil), other));
    }

    const results = await Promise.all(promises);
    let response = Array.isArray(results[0]) ? [] : {};
    results.forEach((result) => {
        response = Array.isArray(response) ? [...response, ...result] : { ...response, ...result };
    });
    return response;
};

module.exports = migrationController;
