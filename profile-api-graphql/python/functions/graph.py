from ariadne import MutationType, QueryType, gql, make_executable_schema, graphql
from uuid import uuid4

from nitric.resources import api, collection
from nitric.application import Nitric

type_defs = gql("""
  type Profile {
    pid: String!
    name: String!
    age: Int!
    home: String!
  }

  type Message {
    msg: String!
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
    deleteProfile(pid: String!): Message
  }
""")

query = QueryType()
mutation = MutationType()

graph_api = api("public")
profiles = collection('profiles').allow('reading', 'writing')


@query.field("getProfile")
async def resolve_get_profile(obj, info, pid):

    p = await profiles.doc(pid).get()
    return p.content


@query.field("getProfiles")
async def resolve_get_profiles(obj, info):

    results = await profiles.query().fetch()

    r = []
    for docs in results.documents:
        r.append(docs.content)

    return r


@mutation.field("deleteProfile")
async def resolve_delete_profile(obj, info, pid):

    try:
        await profiles.doc(pid).delete()
        return {'msg': f'Profile with id {pid} deleted.'}
    except:
        return {'msg': f'Profile with id {pid} not found.'}


@mutation.field("updateProfile")
async def update_profiles(obj, info, pid, profile):

    try:
        await profiles.doc(pid).get()
    except:
        return {'msg': f'Profile with id {pid} not found.'}

    p = {'pid': pid, 'name': profile['name'],
         'age': profile['age'], 'home': profile['home']}
    await profiles.doc(pid).set(p)

    return p


@mutation.field("createProfile")
async def resolve_create_profile(obj, info, profile):

    pid = str(uuid4())

    p = {'pid': pid, 'name': profile['name'],
         'age': profile['age'], 'home': profile['home']}
    await profiles.doc(pid).set(p)

    return p


schema = make_executable_schema(type_defs, [query, mutation])


@graph_api.post("/")
async def profile_handler(ctx):
    query = ctx.req.json

    success, result = await graphql(
        schema,
        query
    )

    ctx.res.status = 200 if success else 400
    ctx.res.body = result

Nitric.run()
