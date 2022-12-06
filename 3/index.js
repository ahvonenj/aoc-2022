
// https://stackoverflow.com/a/10456644/2284136
Object.defineProperty(Array.prototype, 'chunk_inefficient', {
    value: function(chunkSize) {
        var array = this;
        return [].concat.apply([],
        array.map(function(elem, i) {
            return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
        })
        );
    }
});

const solve = (initialInput) => {
    const letters = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const priorities = Object.fromEntries(Object.entries(Object.assign({}, letters)).map(a => a.reverse()));
    delete priorities['_'];

    const ruckSacks = initialInput.map(i => {
        const items = i.split('');
        const comp_a = items.slice(0, Math.floor(items.length / 2));
        const comp_b = items.slice(Math.floor(items.length / 2), items.length);
        const in_both = comp_a.filter(value => comp_b.includes(value))[0];

        return {
            comp_a,
            comp_b,
            in_both,
            prio: parseInt(priorities[in_both], 10)
        }
    });

    //console.log(ruckSacks.reduce((acc, v) => acc + v.prio, 0))

    const input2 = initialInput.chunk_inefficient(3);

    let ruckSacks2 = input2.map(g => {
        return g.map(i => {
            const items = i.split('');
            const comp_a = items.slice(0, Math.floor(items.length / 2));
            const comp_b = items.slice(Math.floor(items.length / 2), items.length);
            const in_both = comp_a.filter(value => comp_b.includes(value))[0];

            return {
                items,
                comp_a,
                comp_b,
                in_both,
                prio: parseInt(priorities[in_both], 10)
            }
        });
    });

    ruckSacks2 = ruckSacks2.map(g => {
        return parseInt(priorities[g[0].items.filter(value => g[1].items.includes(value) && g[2].items.includes(value))[0]], 10)
    });

    console.log(ruckSacks2.reduce((acc, v) => acc + v, 0))
}

export default solve;