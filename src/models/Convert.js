export default class Convert {
    constructor(input, result, from, to) {
        this.input = input;
        this.result = result;
        this.from = from;
        this.to = to;
    }

    toJSON() {
        return {
            input: this.input,
            result: this.result,
            from: this.from,
            to: this.to,
        };
    }

}