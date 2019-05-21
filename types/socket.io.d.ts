export = index;
declare class index {
    // Circular reference from index
    static listen: any;
    constructor(srv: any, opts: any);
    nsps: any;
    parentNsps: any;
    parser: any;
    encoder: any;
    sockets: any;
    adapter(v: any, ...args: any[]): any;
    addListener(...args: any[]): any;
    attach(srv: any, opts: any): any;
    attachServe(srv: any): void;
    binary(...args: any[]): any;
    bind(engine: any): any;
    checkNamespace(name: any, query: any, fn: any): any;
    checkRequest(req: any, fn: any): any;
    clients(...args: any[]): any;
    close(fn: any): void;
    compress(...args: any[]): any;
    emit(...args: any[]): any;
    eventNames(...args: any[]): any;
    getMaxListeners(...args: any[]): any;
    initEngine(srv: any, opts: any): void;
    listen(srv: any, opts: any): any;
    listenerCount(...args: any[]): any;
    listeners(...args: any[]): any;
    of(name: any, fn: any): any;
    off(...args: any[]): any;
    on(...args: any[]): any;
    once(...args: any[]): any;
    onconnection(conn: any): any;
    origins(v: any, ...args: any[]): any;
    path(v: any, ...args: any[]): any;
    prependListener(...args: any[]): any;
    prependOnceListener(...args: any[]): any;
    rawListeners(...args: any[]): any;
    removeAllListeners(...args: any[]): any;
    removeListener(...args: any[]): any;
    send(...args: any[]): any;
    serve(req: any, res: any): void;
    serveClient(v: any, ...args: any[]): any;
    serveMap(req: any, res: any): void;
    set(key: any, val: any): any;
    setMaxListeners(...args: any[]): any;
    to(...args: any[]): any;
    use(...args: any[]): any;
    write(...args: any[]): any;
}