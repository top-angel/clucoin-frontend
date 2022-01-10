export interface PriceData {
  [k: string]: {
    usd: string;
    bnb: string;
  };
}

export interface CluData {
  total_burnt: number;
  market_cap: number;
  price: PriceData;
  supply: number;
}

export interface Task {
  id: string;
  detail: string;
}

export interface NFT {
  token_id: number;
  image_url: string;
  description: string;
  name: string;
  ipfs_url: string;
  limited: boolean;
  limited_count: number;
  non_limited_image_url: string;
  animation_url: string;
  non_limited_image_name: string;
  non_limited_ipfs_url: string;
}

export interface Quest {
  id: string;
  name: string;
  nft: NFT;
  description: string;
  tasks: Task[];
}

export interface Season {
  id: string;
  name: string;
  description: string;
  starts_at: Date;
  ends_at: Date;
  quests: Quest[];
}
export type Seasons = Season[];

export interface Wallet {
  id: string;
  address: string;
  nickname: string;
}
export type Wallets = Wallet[];

export interface DiscordIntegration {
  username: string;
  discriminator: string;
  is_public: boolean;
}

export interface TwitchIntegration {
  username: string;
  is_public: boolean;
}

export type Integration = "twitch" | "discord";

export interface User {
  id: string;
  username: string;
  avatar_hash: string;
  email: string;
  email_verified: boolean;
  allow_emails: boolean;
  wallets: Wallets;
  allow_public_badges: boolean;
  integrations: {
    discord?: DiscordIntegration;
    twitch?: TwitchIntegration;
  };
  completed_tasks: string[];
}

export type TransactionType = "t_in" | "t_out" | "buy" | "sell";

export interface Transaction {
  txn_id: string;
  value: number;
  block_no: string;
  gas: string;
  timestamp: string;
  type: TransactionType;
}

export interface Reflection {
  balance: number;
  timestamp: number;
  reflection: number;
}

export interface CMSObject {
  id: number;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
}

export type CMSImage = {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: any;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata: any;
  created_at: Date;
  updated_at: Date;
};

export interface BlogPost extends CMSObject {
  title: string;
  description: string;
  image: CMSImage;
  authorname: string;
  slug: string;
  date: Date;
}

export interface Event extends CMSObject {
  id: number;
  title: string;
  description: string;
  date: Date;
  image: CMSImage;
}

export interface Charity extends CMSObject {
  id: number;
  name: string;
  vision: string;
  image: CMSImage;
  donated: boolean;
}

export type ProposalState = "active";

export interface Proposal {
  id: string;
  title: string;
  body: string;
  choices: string[];
  start: number;
  end: number;
  snapshot: string;
  state: ProposalState;
  author: string;
}

export interface Vote {
  id: string;
  voter: string;
  choice: number;
  created: number;
}

export interface Holder extends CMSObject {
  number: number;
}
