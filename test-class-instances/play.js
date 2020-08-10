class Great {
    constructor(a, b, c) {
        this.a = a,
        this.b = b,
        this.c = c
        Great.instances.push(this)
    }
    static instances = []
}

const rerr = new Great(3, 4, 'r')
const reft = new Great(5, 6, 'f')

console.log(rerr)

console.log(Great.instances)