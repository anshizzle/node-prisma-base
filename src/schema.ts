import {
  intArg,
  makeSchema,
  nonNull,
  objectType,
  stringArg,
  inputObjectType,
  arg,
  asNexusMethod,
  enumType,
} from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'
import { Context } from './context'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nullable.field('CurrentUser', {
      type: 'User',
      resolve: (_parent, _args, context: Context) => {
        console.log(context.currentUser);
        return context.currentUser;
      },
    });
  },
})

// const Mutation = objectType({
//   name: 'Mutation',
//   definition(t) {
//     t.nonNull.field('signupUser', {
//       type: 'User',
//       args: {
//         data: nonNull(
//           arg({
//             type: 'UserCreateInput',
//           }),
//         ),
//       },
//       resolve: (_, args, context: Context) => {
//         const postData = args.data.posts?.map((post) => {
//           return { title: post.title, content: post.content || undefined }
//         })
//         return context.prisma.user.create({
//           data: {
//             name: args.data.name,
//             email: args.data.email,
//             posts: {
//               create: postData,
//             },
//           },
//         })
//       },
//     })
//
//     t.field('createDraft', {
//       type: 'Post',
//       args: {
//         data: nonNull(
//           arg({
//             type: 'PostCreateInput',
//           }),
//         ),
//         authorEmail: nonNull(stringArg()),
//       },
//       resolve: (_, args, context: Context) => {
//         return context.prisma.post.create({
//           data: {
//             title: args.data.title,
//             content: args.data.content,
//             author: {
//               connect: { email: args.authorEmail },
//             },
//           },
//         })
//       },
//     })
//
//     t.field('togglePublishPost', {
//       type: 'Post',
//       args: {
//         id: nonNull(intArg()),
//       },
//       resolve: async (_, args, context: Context) => {
//         try {
//           const post = await context.prisma.post.findUnique({
//             where: { id: args.id || undefined },
//             select: {
//               published: true,
//             },
//           })
//           return context.prisma.post.update({
//             where: { id: args.id || undefined },
//             data: { published: !post?.published },
//           })
//         } catch (e) {
//           throw new Error(
//             `Post with ID ${args.id} does not exist in the database.`,
//           )
//         }
//       },
//     })
//
//     t.field('incrementPostViewCount', {
//       type: 'Post',
//       args: {
//         id: nonNull(intArg()),
//       },
//       resolve: (_, args, context: Context) => {
//         return context.prisma.post.update({
//           where: { id: args.id || undefined },
//           data: {
//             viewCount: {
//               increment: 1,
//             },
//           },
//         })
//       },
//     })
//
//     t.field('deletePost', {
//       type: 'Post',
//       args: {
//         id: nonNull(intArg()),
//       },
//       resolve: (_, args, context: Context) => {
//         return context.prisma.post.delete({
//           where: { id: args.id },
//         })
//       },
//     })
//   },
// })

const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.id('id')
    t.string('name')
    t.nonNull.string('email')
    t.string('phoneNumber')
  },
})

export const schema = makeSchema({
  types: [
    Query,
    // Mutation,
    User,
    DateTime,
  ],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})
