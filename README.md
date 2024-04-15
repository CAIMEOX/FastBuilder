# FastBuilder

![fb](images/logo.png)

Websocket based Minecraft Bedrock Structure Generator.
Currently a port of [Voxel Geometry](https://github.com/CAIMEOX/VoxelGeometry.git) in WebSocket.
There is also a version using gametest framework (ScriptAPI) in [here](https://github.com/LoveCouple/VoxelGeometryMC).

## Run the server

Install the dependencies by `pnpm i` or `npm i` and then execute the server by:

```bash
npm run start
```

## Basic Concepts

### Command
Note that all the commands can be sent to the server by using the in-game chat. The command should start with the prefix `-`. A command is also a javascript code snippet, and **FastBuilder** behaves as a javascript runtime where you can invoke the geometry API provided by the server.

### Vector

A vector represent a voxel in the Space, which has 3 components.

```js
// Create a unit vector
const vec: Vec3 = vec3(1, 1, 1);
```

### Space

Many Voxel Geometry functions will return a **Space** (A array of 3D vectors).

```ts
const ball: Space = sphere(5, 4);
```

## Basic Geometry

### Sphere

Create a sphere with radius.

```haskell
sphere :: (radius, inner_radius) -> Space
sphere(5, 4)
```

### Circle

Create a circle with radius.

```haskell
circle :: (radius, inner_radius) -> Space
circle(5, 4)
```

## Transformer

### scale

Scale up a Space

```haskell
scale :: (Space, size) -> Space
```

### swap

Change the direction of a space.

```haskell
swap :: (Space, number, number) -> Space
```

### pipe

Take the point of the previous space as the origin of the next space.

```haskell
pipe :: (Space_1, Space_2, ...) -> Space
```

### diffusion

Spread out points of a space by a factor.

```haskell
diffusion :: (Space, factor) -> Space
```

### move

Move a space into a specific point.

```haskell
move :: (Space, x, y, z) -> Space
```

### embed

Embed a space into another space

```haskell
embed :: (Space, Space) -> Space
```

### Array Generator

Construct a discrete set of points.

```haskell
array_gen :: (xn, yn, zn, dx, dy, dz) -> Space
```

- \_n : Count
- d\_ : Interval

With step function:

```haskell
array_gen_fn :: (xn, yn, zn, num -> num, num -> num, num -> num) -> Space
```

## Turtle

### Turtle2D

Turtle graphics are vector graphics using a relative cursor (the "turtle") upon a Cartesian plane (x and y axis).

Voxel Geometry supports basic functions of turtle graphics:

```javascript
// Draw a straight with length 10
const t = new Turtle2D();
t.forward(10);
plot(t.getTrack());
```

### Turtle3D

Same as Turtle2D but lives in 3D space.

## L-System

An L-system or Lindenmayer system is a parallel rewriting system and a type of formal grammar.It consists of an **alphabet**, a collection of **production rules** that expand each symbol into some larger string of symbols, an initial "**axiom**" string from which to begin construction, and a **mechanism** (Such as Turtle Graphics) for translating the generated strings into geometric structures.

In Voxel Geometry, you can use this function to create a Bracketed L-system:

```haskell
lsystem :: (axiom, Rules, generation) -> Space
```

For instance, we can create Peano curve by using l-system.

```javascript
lsystem(
  "X",
  {
    X: "XFYFX+F+YFXFY-F-XFYFX",
    Y: "YFXFY-F-XFYFX+F+YFXFY",
  },
  5
);
```

Voxel Geometry uses Turtle Graphics as default mechanism.

## Canvas

Voxel geometry supports a part of Canvas API in browser.

## Math Interpreter

### Parametric Equation

Parametric equations are commonly used to express the coordinates of the points that make up a geometric object such as a curve or surface. It includes group of quantities as functions of one or more independent variables called **parameters**.

For instance, we could write down the Parametric equations of ellipse. (t is the parameter, which varies from 0 to 2\*Pi)

```javascript
// a and b are constants
x = a * cos(t);
y = b * sin(t);
```

Express this in Voxel Geometry (step represent the changing value of the parameter):

```javascript
let step = 0.1;
plot(
  simple_parametric("5*Math.cos(t)", "0", "10*Math.sin(t)", [
    "t",
    0,
    Math.PI * 2,
    step,
  ])
);
```

### Expression

Takes a math expression (Such as inequality) as a condition and intervals, construct a space satisfies this:

```haskell
simple_equation :: (Expr, start, end, step) -> Space
```

For instance we can construct a sphere:

```javascript
plot(simple_equation("x*x+y*y+z*z<=5", -5, 5, 1));
```

## Diffusion Limited Aggression

Simulating particles undergoing a random walk due to Brownian motion cluster together to form aggregates of such particles.

### DLA2D

```haskell
DLA2D :: (width, maxWalk, iterations, stepLength, temperature, stuckSpace = centerPoint) -> Space
```

- width : Width of operation space.
- maxWalk : Maximum number of particles that can exist simultaneously.
- iterations : Determine how many times before each particle supplement.
- stepLength : Step size of particles.
- temperature : The temperature of the iterative system will gradually decrease, which is related to the number of subsequent replenishment points.
- stuckSpace : A collection of particles that have been fixed at the beginning.

### DLA3D

Same as DLA2D but lives in 3D space.

```haskell
DLA3D :: (width, maxWalk, iterations, stepLength, temperature, stuckSpace = centerPoint) -> Space
```

## Iterated Function System

An iterated function system is a finite set of mappings on a complete metric space. Iterated function systems (IFSs) are a method of constructing **fractals**.

Voxel Geometry uses the classic algorithm named **Chaos Game** to compute IFS fractals.

Voxel Geometry uses the representation introduced in [this website](https://cs.lmu.edu/~ray/notes/ifs/)

By convention an IFS is written in rows of numbers in the form :

```
a    b    c    d    e    f    p
```

which describes the transform `λ(x,y).(ax+by+e,cx+dy+f)`. The value p represents the percentage of the fractal's area generated by the transform. Theoretically it is not required but if you select it well, the fractal is drawn much more efficiently.

```haskell
create_IFS :: (form, width, height) -> IFS
```

Here is a classic to try:

```javascript
// Create an IFS with Fractals.angle, 100000 iteration
plot(create_IFS(Fractals.angle, 100, 100).run(100000));
```

## TODO
- [ ] The notation in the document should be updated.
- [ ] Load structure from NBT / MCStructure and more file formats.

## Maintainer

- [**CAIMEO**](https://github.com/CAIMEOX)
