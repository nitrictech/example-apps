import { uuid } from "uuidv4";
import { api, collection } from "@nitric/sdk";
import { graphql, buildSchema } from "graphql";

const schema = buildSchema(`
  type Profile {
    pid: String!
    name: String!
    age: Int!
    home: String!
  }

  input ProfileInput {
    name: String!
    age: Int!
    home: String!
  }

  type Query {
    getProfiles: [Profile]
    getProfile(pid: String!): Profile
  }

  type Mutation {
    createProfile(profile: ProfileInput!): Profile
    updateProfile(pid: String!, profile: ProfileInput!): Profile
  }
`);

interface Profile {
  pid: string;
  name: string;
  age: number;
  home: string;
}

type ProfileInput = Omit<Profile, "pid">;

const profiles = collection<ProfileInput>("profiles").for("reading", "writing");

const createProfile = async ({ profile }): Promise<Profile> => {
  const pid = uuid();

  await profiles.doc(pid).set(profile);

  return {
    pid,
    ...profile,
  };
};

const updateProfile = async ({ pid, profile }) => {
  await profiles.doc(pid).set(profile);

  return {
    pid,
    ...profile,
  };
};

const getProfiles = async (): Promise<Profile[]> => {
  const result = await profiles.query().fetch();

  return result.documents.map((doc) => ({
    pid: doc.id,
    ...doc.content,
  }));
};

const getProfile = async ({ pid }): Promise<Profile> => {
  const profile = await profiles.doc(pid).get();

  return {
    pid,
    ...profile,
  };
};

const resolvers = {
  getProfiles,
  getProfile,
  createProfile,
  updateProfile,
};

const profileApi = api("public");

profileApi.post("/", async (ctx) => {
  const { query, variables } = ctx.req.json();
  const result = await graphql({
    schema: schema,
    source: query,
    rootValue: resolvers,
  });

  return ctx.res.json(result);
});
