# Token Manager
> A simple easy to use dashboard for ERC20 tokens

## Inspiration
I needed a simple easy to use dashboard to perform some basic operations like approving a wallet/contract to spend select tokens on my behalf etc and so I created it.

## What it does
Currently, the manager has two major features.
1. Easy transfer of tokens to other addresses
2. Approve other address to be able to spend on one's behalf

## How I built it
I used React + NextJS + MUI for frontend and wrote most of the web3 integrations using ethers by myself as well.

## Challenges we ran into
1. Basic ether to number conversions, lots of uncaught errors had to be fixed at the last moment
2. User feedback toasts gave issues with config et al. Apparently the package I used is not so compatible with nextjs

## Accomplishments that we're proud of
I wrote web3 integrations and even created custom hook to handle it 🤓

## What was learned?
- how to integrate web3 and connect wallet with web3modal
- how to integrate toats into nextjs
- writing ownable smart contracts and deploying erc20 tokens with solidity

## What's next for Token Manager
- Add more functions and features
- Bring in support for NFTs
