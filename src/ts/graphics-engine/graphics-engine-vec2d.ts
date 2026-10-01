export class Vector2D
{
    public X: number;
    public Y: number;

    constructor(x: number, y: number);
    constructor(x: Vector2D);
    constructor(x: number | Vector2D, y?: number)
    {
        if (typeof x == "number")
        {
            this.X = <number>x;
            this.Y = y || 0;
        }
        else if (x instanceof Vector2D)
        {
            this.X = x.X;
            this.Y = x.Y;
        }
        else
        {
            this.X = 0;
            this.Y = 0;
        }
    }

    clone = (): Vector2D => { return new Vector2D(this.X, this.Y); }

    /* Length */
    getLength = (): number => { return Math.sqrt((this.X * this.X) + (this.Y * this.Y)); }
    getLengthSquared = (): number => { return (this.X * this.X) + (this.Y * this.Y); }

    /* Normalization */
    normalize = (): void =>
    {
        let mag: number = this.getLength();
        if (mag === 0)
        {
            return;
        }
        this.X = this.X / mag;
        this.Y = this.Y / mag;
    }

    getNormalized = (): Vector2D =>
    {
        let mag: number = this.getLength();
        if (mag === 0)
        {
            return new Vector2D(0, 0);
        }
        return new Vector2D(this.X / mag, this.Y / mag);
    }

    /* Addition */
    add = (dx: number, dy: number): void =>
    {
        this.X += dx;
        this.Y += dy;
    }
    addVec = (v: Vector2D): void =>
    {
        this.X += v.X;
        this.Y += v.Y;
    }
    getAdd = (dx: number, dy: number): Vector2D => { return new Vector2D(this.X + dx, this.Y + dy); }
    getAddVec = (v: Vector2D): Vector2D => { return new Vector2D(this.X + v.X, this.Y + v.Y); }

    /* Subtraction */
    sub = (dx: number, dy: number): void =>
    {
        this.X -= dx;
        this.Y -= dy;
    }
    subVec = (v: Vector2D): void =>
    {
        this.X -= v.X;
        this.Y -= v.Y;
    }
    getSub = (dx: number, dy: number): Vector2D => { return new Vector2D(this.X - dx, this.Y - dy); }
    getSubVec = (v: Vector2D): Vector2D => { return new Vector2D(this.X - v.X, this.Y - v.Y); }

    /* Multiplication */
    mul = (s: number): void => { this.X *= s; this.Y *= s; }
    getMul = (s: number): Vector2D => { return new Vector2D(this.X * s, this.Y * s); }

    /* Division */
    div = (s: number): void => { this.X /= s; this.Y /= s; }
    getDiv = (s: number): Vector2D => { return new Vector2D(this.X / s, this.Y / s); }

    /* Dot product */
    dotProduct = (v: Vector2D): number => { return ((this.X * v.X) + (this.Y * v.Y)) }

    /* Perp dot product */
    perpDotProduct = (v: Vector2D): number => { return ((this.X * v.Y) - (this.Y * v.X)) }

    /* Opposite */
    opposite = (): void => { this.X = -this.X; this.Y = -this.Y; }
    getOpposite = (): Vector2D => { return new Vector2D(-this.X, -this.Y); }

    /* Perpendicular */
    perpendicularCCW = (): void =>
    {
        const x: number = this.X;
        this.X = -this.Y;
        this.Y = x;
    }
    getPerpendicularCCW = (): Vector2D => { return new Vector2D(-this.Y, this.X); }
    perpendicularCW = (): void =>
    {
        const x: number = this.X;
        this.X = this.Y;
        this.Y = -x;
    }
    getPerpendicularCW = (): Vector2D => { return new Vector2D(this.Y, -this.X); }

    /* IsOrthogonal */
    isOrthogonal = (v: Vector2D): boolean => { return this.dotProduct(v) == 0; }

    /* IsColinear */
    isColinear = (v: Vector2D): boolean => { return this.perpDotProduct(v) == 0; }

    /* Rotate */
    rotate = (angle: number): void =>
    {
        let sin: number = Math.sin(angle);
        let cos: number = Math.cos(angle);
        let newX: number = this.X * cos - this.Y * sin;
        let newY: number = this.X * sin + this.Y * cos;
        this.X = newX;
        this.Y = newY;
    }

    getRotated = (angle: number): Vector2D =>
    {
        let sin: number = Math.sin(angle);
        let cos: number = Math.cos(angle);
        let newX: number = this.X * cos - this.Y * sin;
        let newY: number = this.X * sin + this.Y * cos;
        return new Vector2D(newX, newY);
    }

    /* Polar */
    getVectorFromPolar = (mag: number, angle: number): Vector2D =>
    {
        return new Vector2D(mag * Math.cos(angle), mag * Math.sin(angle));
    }

    getPolarMagnitude = (): number => { return this.getLength(); }
    
    /* Returns the polar angle in radians, measured counter-clockwise from the positive x-axis. */
    getPolarAngle = (): number =>
    {
        if (this.X === 0 && this.Y === 0)
        {
            throw new Error("Zero vector has no polar angle");
        }

        return Math.atan2(this.Y, this.X);
    }

    /* Returns the polar angle in radians, measured counter-clockwise from the positive x-axis, in the range [0, 2π). */
    getPolarAngle2 = (): number =>
    {
        const angle = Math.atan2(this.Y, this.X);
        return angle >= 0 ? angle : angle + 2 * Math.PI;
    }

    /* Projected */
    getProjectLength = (v: Vector2D): number =>
    {
        return (this.dotProduct(v) / this.getLength());
    }
    getProjectVector = (v: Vector2D): Vector2D =>
    {
        return this.getNormalized().getMul(this.dotProduct(v) / this.getLength());
    }
}


