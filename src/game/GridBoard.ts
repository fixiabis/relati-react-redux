/** 棋盤格方向(相對位置) */
export enum GridDirection {
    /** (x + 0, y + 0)原位 */
    C = 0x0000,

    /** (x + 0, y - 1)向前 */
    F = 0x1000,
    /** (x + 0, y + 1)向後 */
    B = 0x0100,
    /** (x + 1, y + 0)向右 */
    R = 0x0010,
    /** (x - 1, y + 0)向左 */
    L = 0x0001,
    /** (x + 1, y - 1)向右前 */
    FR = 0x1010,
    /** (x - 1, y - 1)向左前 */
    FL = 0x1001,
    /** (x + 1, y + 1)向右後 */
    BR = 0x0110,
    /** (x - 1, y + 1)向左後 */
    BL = 0x0101,

    /** (x + 0, y - 2)向前兩單位 */
    FF = 0x2000,
    /** (x + 0, y + 2)向後兩單位 */
    BB = 0x0200,
    /** (x + 2, y + 0)向右兩單位 */
    RR = 0x0020,
    /** (x - 2, y + 0)向左兩單位 */
    LL = 0x0002,
    /** (x + 2, y - 2)向右前兩單位 */
    FFRR = 0x2020,
    /** (x - 2, y - 2)向左前兩單位 */
    FFLL = 0x2002,
    /** (x + 2, y + 2)向右後兩單位 */
    BBRR = 0x0220,
    /** (x - 2, y + 2)向左後兩單位 */
    BBLL = 0x0202,

    /** (x + 1, y - 2) */
    FFR = 0x2010,
    /** (x - 1, y - 2) */
    FFL = 0x2001,
    /** (x + 1, y + 2) */
    BBR = 0x0210,
    /** (x - 1, y + 2) */
    BBL = 0x0201,
    /** (x + 2, y - 1) */
    FRR = 0x1020,
    /** (x - 2, y - 1) */
    FLL = 0x1002,
    /** (x + 2, y + 1) */
    BRR = 0x0120,
    /** (x - 2, y + 1) */
    BLL = 0x0102,
}

/**
 * 棋盤
 * @generic {GridBody} 棋盤格內容
 */
export class GridBoard<GridBody> {
    /** 寬度 */
    public width: number;
    /** 高度 */
    public height: number;
    /** 格數 */
    public length: number;
    /** 棋盤格 */
    public grids: Array<Grid<GridBody>>;

    /**
     * 建立棋盤
     * @param width 寬度
     * @param height 高度
     */
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.length = width * height;
        this.grids = [];

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const grid = new Grid<GridBody>(x, y, this);
                this.grids[grid.i] = grid;
            }
        }
    }

    /**
     * 取得棋盤格
     * @param x X座標
     * @param y Y座標
     * @return 棋盤格或空值
     */
    public getGrid(x: number, y: number): Grid<GridBody> | null {
        if (
            x < 0 || x >= this.width ||
            y < 0 || y >= this.height
        ) { return null; }

        const i = x * this.height + y;
        return this.grids[i];
    }
}

/**
 * 棋盤格
 * @generic {GridBody} 棋盤格內容
 */
export class Grid<GridBody> {
    /** X座標 */
    public x: number;
    /** Y座標 */
    public y: number;
    /** 索引 */
    public i: number;
    /** 內容 */
    public body?: GridBody;
    /** 所屬棋盤 */
    public board: GridBoard<GridBody>;

    /**
     * 建立棋盤格
     * @param x X座標
     * @param y Y座標
     * @param board 棋盤
     */
    constructor(x: number, y: number, board: GridBoard<GridBody>) {
        this.board = board;
        this.x = x;
        this.y = y;
        this.i = x * board.height + y;
    }

    /**
     * 取得棋盤格
     * @param direction 相對位置(方向)
     * @see GridDirection
     * @return 棋盤格或空值
     */
    public getGrid(direction: GridDirection): Grid<GridBody> | null;

    /**
     * 取得棋盤格
     * @param direction 相對位置(方向)，採用16進制，分別為F(Y - 1), B(Y + 1), R(X + 1), L(X - 1)
     * @example
     * var direction = 0x8050; // == (Y - 8, X + 5);
     * @return 棋盤格或空值
     */
    public getGrid(direction: number): Grid<GridBody> | null;

    /**
     * 取得棋盤格
     * @param f 相對位置，為-Y的移動單位
     * @param b 相對位置，為+Y的移動單位
     * @param r 相對位置，為+X的移動單位
     * @param l 相對位置，為-X的移動單位
     * @return 棋盤格或空值
     */
    public getGrid(f: number, b: number, r: number, l: number): Grid<GridBody> | null;
    public getGrid(f: number, b?: number, r?: number, l?: number): Grid<GridBody> | null {
        if (b === undefined || r === undefined || l === undefined) {
            const direction = f;
            f = (0xF000 & direction) >> 12;
            b = (0x0F00 & direction) >> 8;
            r = (0x00F0 & direction) >> 4;
            l = (0x000F & direction);
        }

        const x = this.x + r - l;
        const y = this.y + b - f;
        return this.board.getGrid(x, y);
    }
}
