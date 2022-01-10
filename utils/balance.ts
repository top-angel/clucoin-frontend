export const getBadgesFromBalance = (balance: number) => {
  const badges = [];

  if (balance >= 166666666) {
    badges.push([
      "https://ipfs.io/ipfs/QmTjXgydqYKYzsXTLAxYGjyyB8v4z48wph8ZLPAN8ML4rQ",
      "TropiCLU Fish",
    ]);
  }
  if (balance >= 5555555556) {
    badges.push([
      "https://ipfs.io/ipfs/QmUiEPxwfq1h2ksXRFqMHLtVT3qbQ7tg6KnbVBT8N5eLEr",
      "Jellyfish",
    ]);
  }
  if (balance >= 16666666667) {
    badges.push([
      "https://ipfs.io/ipfs/QmVQTc2Rj1GZTR3iv3SMN17h6TKBSp8hEHwBUXn6YRWpbX",
      "Dolphin",
    ]);
  }
  if (balance >= 55555555556) {
    badges.push([
      "https://ipfs.io/ipfs/QmVqtVT4Ztf4TebUfp8isJDvSpPrxMVedGfrSk41hm5mJY",
      "Shark",
    ]);
  }
  if (balance >= 555555555556) {
    badges.push([
      "https://ipfs.io/ipfs/QmP3bty9L5Uqz3DBjih3XZmKMXWBKHE6o2bNdpsST221oS",
      "Whale",
    ]);
  }
  if (balance >= 5555555555555) {
    badges.push([
      "https://ipfs.io/ipfs/QmesQL7pE5kDs3nSbsmmEh3qBm52CBjEdUvNXMP5zyE4st",
      "Cluthulu",
    ]);
  }

  return badges;
};
