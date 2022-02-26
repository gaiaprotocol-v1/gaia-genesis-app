# Gaia Kronos App

A decentralized mining type NFT with Kronos DAO.

## Get Started

```
npm install
npm run webpack-dev
cd docs
swserver
```

## Folder Structure

```
docs
- images
- styles
src
- component
- contracts
- klaytn
- view
```

## Code Convention

### images

1. name

```
prefix_name
```

2. prefix

```
bg: background
img: image
icn: icon
btn: button
```

3. folder

```
shared
- icn
- img
- bg
component
- ...
view
- ...
favicon
```

### src

1. At the end of the variable add,

```
el("h1" ,"hello"),
```

### styles

1. using child selector

```
>.test {
    >p {
        color: #fff;
    }
}
```

2. using color code is rgba

```
rgba(0,0,0,1);
```

3. container? wrap?

```
container: more than two
wrap: only one
```
