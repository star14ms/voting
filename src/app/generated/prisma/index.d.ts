
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Celebrity
 * 
 */
export type Celebrity = $Result.DefaultSelection<Prisma.$CelebrityPayload>
/**
 * Model TVShow
 * 
 */
export type TVShow = $Result.DefaultSelection<Prisma.$TVShowPayload>
/**
 * Model Vote
 * 
 */
export type Vote = $Result.DefaultSelection<Prisma.$VotePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Celebrities
 * const celebrities = await prisma.celebrity.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Celebrities
   * const celebrities = await prisma.celebrity.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.celebrity`: Exposes CRUD operations for the **Celebrity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Celebrities
    * const celebrities = await prisma.celebrity.findMany()
    * ```
    */
  get celebrity(): Prisma.CelebrityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tVShow`: Exposes CRUD operations for the **TVShow** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TVShows
    * const tVShows = await prisma.tVShow.findMany()
    * ```
    */
  get tVShow(): Prisma.TVShowDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vote`: Exposes CRUD operations for the **Vote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Votes
    * const votes = await prisma.vote.findMany()
    * ```
    */
  get vote(): Prisma.VoteDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Celebrity: 'Celebrity',
    TVShow: 'TVShow',
    Vote: 'Vote'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "celebrity" | "tVShow" | "vote"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Celebrity: {
        payload: Prisma.$CelebrityPayload<ExtArgs>
        fields: Prisma.CelebrityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CelebrityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CelebrityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CelebrityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CelebrityPayload>
          }
          findFirst: {
            args: Prisma.CelebrityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CelebrityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CelebrityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CelebrityPayload>
          }
          findMany: {
            args: Prisma.CelebrityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CelebrityPayload>[]
          }
          create: {
            args: Prisma.CelebrityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CelebrityPayload>
          }
          createMany: {
            args: Prisma.CelebrityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CelebrityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CelebrityPayload>[]
          }
          delete: {
            args: Prisma.CelebrityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CelebrityPayload>
          }
          update: {
            args: Prisma.CelebrityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CelebrityPayload>
          }
          deleteMany: {
            args: Prisma.CelebrityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CelebrityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CelebrityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CelebrityPayload>[]
          }
          upsert: {
            args: Prisma.CelebrityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CelebrityPayload>
          }
          aggregate: {
            args: Prisma.CelebrityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCelebrity>
          }
          groupBy: {
            args: Prisma.CelebrityGroupByArgs<ExtArgs>
            result: $Utils.Optional<CelebrityGroupByOutputType>[]
          }
          count: {
            args: Prisma.CelebrityCountArgs<ExtArgs>
            result: $Utils.Optional<CelebrityCountAggregateOutputType> | number
          }
        }
      }
      TVShow: {
        payload: Prisma.$TVShowPayload<ExtArgs>
        fields: Prisma.TVShowFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TVShowFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TVShowPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TVShowFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TVShowPayload>
          }
          findFirst: {
            args: Prisma.TVShowFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TVShowPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TVShowFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TVShowPayload>
          }
          findMany: {
            args: Prisma.TVShowFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TVShowPayload>[]
          }
          create: {
            args: Prisma.TVShowCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TVShowPayload>
          }
          createMany: {
            args: Prisma.TVShowCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TVShowCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TVShowPayload>[]
          }
          delete: {
            args: Prisma.TVShowDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TVShowPayload>
          }
          update: {
            args: Prisma.TVShowUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TVShowPayload>
          }
          deleteMany: {
            args: Prisma.TVShowDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TVShowUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TVShowUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TVShowPayload>[]
          }
          upsert: {
            args: Prisma.TVShowUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TVShowPayload>
          }
          aggregate: {
            args: Prisma.TVShowAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTVShow>
          }
          groupBy: {
            args: Prisma.TVShowGroupByArgs<ExtArgs>
            result: $Utils.Optional<TVShowGroupByOutputType>[]
          }
          count: {
            args: Prisma.TVShowCountArgs<ExtArgs>
            result: $Utils.Optional<TVShowCountAggregateOutputType> | number
          }
        }
      }
      Vote: {
        payload: Prisma.$VotePayload<ExtArgs>
        fields: Prisma.VoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          findFirst: {
            args: Prisma.VoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          findMany: {
            args: Prisma.VoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>[]
          }
          create: {
            args: Prisma.VoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          createMany: {
            args: Prisma.VoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>[]
          }
          delete: {
            args: Prisma.VoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          update: {
            args: Prisma.VoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          deleteMany: {
            args: Prisma.VoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>[]
          }
          upsert: {
            args: Prisma.VoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          aggregate: {
            args: Prisma.VoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVote>
          }
          groupBy: {
            args: Prisma.VoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<VoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.VoteCountArgs<ExtArgs>
            result: $Utils.Optional<VoteCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    celebrity?: CelebrityOmit
    tVShow?: TVShowOmit
    vote?: VoteOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CelebrityCountOutputType
   */

  export type CelebrityCountOutputType = {
    Vote: number
  }

  export type CelebrityCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Vote?: boolean | CelebrityCountOutputTypeCountVoteArgs
  }

  // Custom InputTypes
  /**
   * CelebrityCountOutputType without action
   */
  export type CelebrityCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CelebrityCountOutputType
     */
    select?: CelebrityCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CelebrityCountOutputType without action
   */
  export type CelebrityCountOutputTypeCountVoteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoteWhereInput
  }


  /**
   * Count Type TVShowCountOutputType
   */

  export type TVShowCountOutputType = {
    Vote: number
  }

  export type TVShowCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Vote?: boolean | TVShowCountOutputTypeCountVoteArgs
  }

  // Custom InputTypes
  /**
   * TVShowCountOutputType without action
   */
  export type TVShowCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TVShowCountOutputType
     */
    select?: TVShowCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TVShowCountOutputType without action
   */
  export type TVShowCountOutputTypeCountVoteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoteWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Celebrity
   */

  export type AggregateCelebrity = {
    _count: CelebrityCountAggregateOutputType | null
    _avg: CelebrityAvgAggregateOutputType | null
    _sum: CelebritySumAggregateOutputType | null
    _min: CelebrityMinAggregateOutputType | null
    _max: CelebrityMaxAggregateOutputType | null
  }

  export type CelebrityAvgAggregateOutputType = {
    id: number | null
  }

  export type CelebritySumAggregateOutputType = {
    id: number | null
  }

  export type CelebrityMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CelebrityMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CelebrityCountAggregateOutputType = {
    id: number
    name: number
    description: number
    imageUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CelebrityAvgAggregateInputType = {
    id?: true
  }

  export type CelebritySumAggregateInputType = {
    id?: true
  }

  export type CelebrityMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CelebrityMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CelebrityCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CelebrityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Celebrity to aggregate.
     */
    where?: CelebrityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Celebrities to fetch.
     */
    orderBy?: CelebrityOrderByWithRelationInput | CelebrityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CelebrityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Celebrities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Celebrities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Celebrities
    **/
    _count?: true | CelebrityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CelebrityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CelebritySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CelebrityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CelebrityMaxAggregateInputType
  }

  export type GetCelebrityAggregateType<T extends CelebrityAggregateArgs> = {
        [P in keyof T & keyof AggregateCelebrity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCelebrity[P]>
      : GetScalarType<T[P], AggregateCelebrity[P]>
  }




  export type CelebrityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CelebrityWhereInput
    orderBy?: CelebrityOrderByWithAggregationInput | CelebrityOrderByWithAggregationInput[]
    by: CelebrityScalarFieldEnum[] | CelebrityScalarFieldEnum
    having?: CelebrityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CelebrityCountAggregateInputType | true
    _avg?: CelebrityAvgAggregateInputType
    _sum?: CelebritySumAggregateInputType
    _min?: CelebrityMinAggregateInputType
    _max?: CelebrityMaxAggregateInputType
  }

  export type CelebrityGroupByOutputType = {
    id: number
    name: string
    description: string | null
    imageUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: CelebrityCountAggregateOutputType | null
    _avg: CelebrityAvgAggregateOutputType | null
    _sum: CelebritySumAggregateOutputType | null
    _min: CelebrityMinAggregateOutputType | null
    _max: CelebrityMaxAggregateOutputType | null
  }

  type GetCelebrityGroupByPayload<T extends CelebrityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CelebrityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CelebrityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CelebrityGroupByOutputType[P]>
            : GetScalarType<T[P], CelebrityGroupByOutputType[P]>
        }
      >
    >


  export type CelebritySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Vote?: boolean | Celebrity$VoteArgs<ExtArgs>
    _count?: boolean | CelebrityCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["celebrity"]>

  export type CelebritySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["celebrity"]>

  export type CelebritySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["celebrity"]>

  export type CelebritySelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CelebrityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "imageUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["celebrity"]>
  export type CelebrityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Vote?: boolean | Celebrity$VoteArgs<ExtArgs>
    _count?: boolean | CelebrityCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CelebrityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CelebrityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CelebrityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Celebrity"
    objects: {
      Vote: Prisma.$VotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      imageUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["celebrity"]>
    composites: {}
  }

  type CelebrityGetPayload<S extends boolean | null | undefined | CelebrityDefaultArgs> = $Result.GetResult<Prisma.$CelebrityPayload, S>

  type CelebrityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CelebrityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CelebrityCountAggregateInputType | true
    }

  export interface CelebrityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Celebrity'], meta: { name: 'Celebrity' } }
    /**
     * Find zero or one Celebrity that matches the filter.
     * @param {CelebrityFindUniqueArgs} args - Arguments to find a Celebrity
     * @example
     * // Get one Celebrity
     * const celebrity = await prisma.celebrity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CelebrityFindUniqueArgs>(args: SelectSubset<T, CelebrityFindUniqueArgs<ExtArgs>>): Prisma__CelebrityClient<$Result.GetResult<Prisma.$CelebrityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Celebrity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CelebrityFindUniqueOrThrowArgs} args - Arguments to find a Celebrity
     * @example
     * // Get one Celebrity
     * const celebrity = await prisma.celebrity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CelebrityFindUniqueOrThrowArgs>(args: SelectSubset<T, CelebrityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CelebrityClient<$Result.GetResult<Prisma.$CelebrityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Celebrity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CelebrityFindFirstArgs} args - Arguments to find a Celebrity
     * @example
     * // Get one Celebrity
     * const celebrity = await prisma.celebrity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CelebrityFindFirstArgs>(args?: SelectSubset<T, CelebrityFindFirstArgs<ExtArgs>>): Prisma__CelebrityClient<$Result.GetResult<Prisma.$CelebrityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Celebrity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CelebrityFindFirstOrThrowArgs} args - Arguments to find a Celebrity
     * @example
     * // Get one Celebrity
     * const celebrity = await prisma.celebrity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CelebrityFindFirstOrThrowArgs>(args?: SelectSubset<T, CelebrityFindFirstOrThrowArgs<ExtArgs>>): Prisma__CelebrityClient<$Result.GetResult<Prisma.$CelebrityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Celebrities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CelebrityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Celebrities
     * const celebrities = await prisma.celebrity.findMany()
     * 
     * // Get first 10 Celebrities
     * const celebrities = await prisma.celebrity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const celebrityWithIdOnly = await prisma.celebrity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CelebrityFindManyArgs>(args?: SelectSubset<T, CelebrityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CelebrityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Celebrity.
     * @param {CelebrityCreateArgs} args - Arguments to create a Celebrity.
     * @example
     * // Create one Celebrity
     * const Celebrity = await prisma.celebrity.create({
     *   data: {
     *     // ... data to create a Celebrity
     *   }
     * })
     * 
     */
    create<T extends CelebrityCreateArgs>(args: SelectSubset<T, CelebrityCreateArgs<ExtArgs>>): Prisma__CelebrityClient<$Result.GetResult<Prisma.$CelebrityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Celebrities.
     * @param {CelebrityCreateManyArgs} args - Arguments to create many Celebrities.
     * @example
     * // Create many Celebrities
     * const celebrity = await prisma.celebrity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CelebrityCreateManyArgs>(args?: SelectSubset<T, CelebrityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Celebrities and returns the data saved in the database.
     * @param {CelebrityCreateManyAndReturnArgs} args - Arguments to create many Celebrities.
     * @example
     * // Create many Celebrities
     * const celebrity = await prisma.celebrity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Celebrities and only return the `id`
     * const celebrityWithIdOnly = await prisma.celebrity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CelebrityCreateManyAndReturnArgs>(args?: SelectSubset<T, CelebrityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CelebrityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Celebrity.
     * @param {CelebrityDeleteArgs} args - Arguments to delete one Celebrity.
     * @example
     * // Delete one Celebrity
     * const Celebrity = await prisma.celebrity.delete({
     *   where: {
     *     // ... filter to delete one Celebrity
     *   }
     * })
     * 
     */
    delete<T extends CelebrityDeleteArgs>(args: SelectSubset<T, CelebrityDeleteArgs<ExtArgs>>): Prisma__CelebrityClient<$Result.GetResult<Prisma.$CelebrityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Celebrity.
     * @param {CelebrityUpdateArgs} args - Arguments to update one Celebrity.
     * @example
     * // Update one Celebrity
     * const celebrity = await prisma.celebrity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CelebrityUpdateArgs>(args: SelectSubset<T, CelebrityUpdateArgs<ExtArgs>>): Prisma__CelebrityClient<$Result.GetResult<Prisma.$CelebrityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Celebrities.
     * @param {CelebrityDeleteManyArgs} args - Arguments to filter Celebrities to delete.
     * @example
     * // Delete a few Celebrities
     * const { count } = await prisma.celebrity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CelebrityDeleteManyArgs>(args?: SelectSubset<T, CelebrityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Celebrities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CelebrityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Celebrities
     * const celebrity = await prisma.celebrity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CelebrityUpdateManyArgs>(args: SelectSubset<T, CelebrityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Celebrities and returns the data updated in the database.
     * @param {CelebrityUpdateManyAndReturnArgs} args - Arguments to update many Celebrities.
     * @example
     * // Update many Celebrities
     * const celebrity = await prisma.celebrity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Celebrities and only return the `id`
     * const celebrityWithIdOnly = await prisma.celebrity.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CelebrityUpdateManyAndReturnArgs>(args: SelectSubset<T, CelebrityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CelebrityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Celebrity.
     * @param {CelebrityUpsertArgs} args - Arguments to update or create a Celebrity.
     * @example
     * // Update or create a Celebrity
     * const celebrity = await prisma.celebrity.upsert({
     *   create: {
     *     // ... data to create a Celebrity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Celebrity we want to update
     *   }
     * })
     */
    upsert<T extends CelebrityUpsertArgs>(args: SelectSubset<T, CelebrityUpsertArgs<ExtArgs>>): Prisma__CelebrityClient<$Result.GetResult<Prisma.$CelebrityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Celebrities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CelebrityCountArgs} args - Arguments to filter Celebrities to count.
     * @example
     * // Count the number of Celebrities
     * const count = await prisma.celebrity.count({
     *   where: {
     *     // ... the filter for the Celebrities we want to count
     *   }
     * })
    **/
    count<T extends CelebrityCountArgs>(
      args?: Subset<T, CelebrityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CelebrityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Celebrity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CelebrityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CelebrityAggregateArgs>(args: Subset<T, CelebrityAggregateArgs>): Prisma.PrismaPromise<GetCelebrityAggregateType<T>>

    /**
     * Group by Celebrity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CelebrityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CelebrityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CelebrityGroupByArgs['orderBy'] }
        : { orderBy?: CelebrityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CelebrityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCelebrityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Celebrity model
   */
  readonly fields: CelebrityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Celebrity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CelebrityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Vote<T extends Celebrity$VoteArgs<ExtArgs> = {}>(args?: Subset<T, Celebrity$VoteArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Celebrity model
   */
  interface CelebrityFieldRefs {
    readonly id: FieldRef<"Celebrity", 'Int'>
    readonly name: FieldRef<"Celebrity", 'String'>
    readonly description: FieldRef<"Celebrity", 'String'>
    readonly imageUrl: FieldRef<"Celebrity", 'String'>
    readonly createdAt: FieldRef<"Celebrity", 'DateTime'>
    readonly updatedAt: FieldRef<"Celebrity", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Celebrity findUnique
   */
  export type CelebrityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Celebrity
     */
    select?: CelebritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Celebrity
     */
    omit?: CelebrityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CelebrityInclude<ExtArgs> | null
    /**
     * Filter, which Celebrity to fetch.
     */
    where: CelebrityWhereUniqueInput
  }

  /**
   * Celebrity findUniqueOrThrow
   */
  export type CelebrityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Celebrity
     */
    select?: CelebritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Celebrity
     */
    omit?: CelebrityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CelebrityInclude<ExtArgs> | null
    /**
     * Filter, which Celebrity to fetch.
     */
    where: CelebrityWhereUniqueInput
  }

  /**
   * Celebrity findFirst
   */
  export type CelebrityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Celebrity
     */
    select?: CelebritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Celebrity
     */
    omit?: CelebrityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CelebrityInclude<ExtArgs> | null
    /**
     * Filter, which Celebrity to fetch.
     */
    where?: CelebrityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Celebrities to fetch.
     */
    orderBy?: CelebrityOrderByWithRelationInput | CelebrityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Celebrities.
     */
    cursor?: CelebrityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Celebrities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Celebrities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Celebrities.
     */
    distinct?: CelebrityScalarFieldEnum | CelebrityScalarFieldEnum[]
  }

  /**
   * Celebrity findFirstOrThrow
   */
  export type CelebrityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Celebrity
     */
    select?: CelebritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Celebrity
     */
    omit?: CelebrityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CelebrityInclude<ExtArgs> | null
    /**
     * Filter, which Celebrity to fetch.
     */
    where?: CelebrityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Celebrities to fetch.
     */
    orderBy?: CelebrityOrderByWithRelationInput | CelebrityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Celebrities.
     */
    cursor?: CelebrityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Celebrities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Celebrities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Celebrities.
     */
    distinct?: CelebrityScalarFieldEnum | CelebrityScalarFieldEnum[]
  }

  /**
   * Celebrity findMany
   */
  export type CelebrityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Celebrity
     */
    select?: CelebritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Celebrity
     */
    omit?: CelebrityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CelebrityInclude<ExtArgs> | null
    /**
     * Filter, which Celebrities to fetch.
     */
    where?: CelebrityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Celebrities to fetch.
     */
    orderBy?: CelebrityOrderByWithRelationInput | CelebrityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Celebrities.
     */
    cursor?: CelebrityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Celebrities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Celebrities.
     */
    skip?: number
    distinct?: CelebrityScalarFieldEnum | CelebrityScalarFieldEnum[]
  }

  /**
   * Celebrity create
   */
  export type CelebrityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Celebrity
     */
    select?: CelebritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Celebrity
     */
    omit?: CelebrityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CelebrityInclude<ExtArgs> | null
    /**
     * The data needed to create a Celebrity.
     */
    data: XOR<CelebrityCreateInput, CelebrityUncheckedCreateInput>
  }

  /**
   * Celebrity createMany
   */
  export type CelebrityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Celebrities.
     */
    data: CelebrityCreateManyInput | CelebrityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Celebrity createManyAndReturn
   */
  export type CelebrityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Celebrity
     */
    select?: CelebritySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Celebrity
     */
    omit?: CelebrityOmit<ExtArgs> | null
    /**
     * The data used to create many Celebrities.
     */
    data: CelebrityCreateManyInput | CelebrityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Celebrity update
   */
  export type CelebrityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Celebrity
     */
    select?: CelebritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Celebrity
     */
    omit?: CelebrityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CelebrityInclude<ExtArgs> | null
    /**
     * The data needed to update a Celebrity.
     */
    data: XOR<CelebrityUpdateInput, CelebrityUncheckedUpdateInput>
    /**
     * Choose, which Celebrity to update.
     */
    where: CelebrityWhereUniqueInput
  }

  /**
   * Celebrity updateMany
   */
  export type CelebrityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Celebrities.
     */
    data: XOR<CelebrityUpdateManyMutationInput, CelebrityUncheckedUpdateManyInput>
    /**
     * Filter which Celebrities to update
     */
    where?: CelebrityWhereInput
    /**
     * Limit how many Celebrities to update.
     */
    limit?: number
  }

  /**
   * Celebrity updateManyAndReturn
   */
  export type CelebrityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Celebrity
     */
    select?: CelebritySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Celebrity
     */
    omit?: CelebrityOmit<ExtArgs> | null
    /**
     * The data used to update Celebrities.
     */
    data: XOR<CelebrityUpdateManyMutationInput, CelebrityUncheckedUpdateManyInput>
    /**
     * Filter which Celebrities to update
     */
    where?: CelebrityWhereInput
    /**
     * Limit how many Celebrities to update.
     */
    limit?: number
  }

  /**
   * Celebrity upsert
   */
  export type CelebrityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Celebrity
     */
    select?: CelebritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Celebrity
     */
    omit?: CelebrityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CelebrityInclude<ExtArgs> | null
    /**
     * The filter to search for the Celebrity to update in case it exists.
     */
    where: CelebrityWhereUniqueInput
    /**
     * In case the Celebrity found by the `where` argument doesn't exist, create a new Celebrity with this data.
     */
    create: XOR<CelebrityCreateInput, CelebrityUncheckedCreateInput>
    /**
     * In case the Celebrity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CelebrityUpdateInput, CelebrityUncheckedUpdateInput>
  }

  /**
   * Celebrity delete
   */
  export type CelebrityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Celebrity
     */
    select?: CelebritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Celebrity
     */
    omit?: CelebrityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CelebrityInclude<ExtArgs> | null
    /**
     * Filter which Celebrity to delete.
     */
    where: CelebrityWhereUniqueInput
  }

  /**
   * Celebrity deleteMany
   */
  export type CelebrityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Celebrities to delete
     */
    where?: CelebrityWhereInput
    /**
     * Limit how many Celebrities to delete.
     */
    limit?: number
  }

  /**
   * Celebrity.Vote
   */
  export type Celebrity$VoteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    where?: VoteWhereInput
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    cursor?: VoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[]
  }

  /**
   * Celebrity without action
   */
  export type CelebrityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Celebrity
     */
    select?: CelebritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Celebrity
     */
    omit?: CelebrityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CelebrityInclude<ExtArgs> | null
  }


  /**
   * Model TVShow
   */

  export type AggregateTVShow = {
    _count: TVShowCountAggregateOutputType | null
    _avg: TVShowAvgAggregateOutputType | null
    _sum: TVShowSumAggregateOutputType | null
    _min: TVShowMinAggregateOutputType | null
    _max: TVShowMaxAggregateOutputType | null
  }

  export type TVShowAvgAggregateOutputType = {
    id: number | null
  }

  export type TVShowSumAggregateOutputType = {
    id: number | null
  }

  export type TVShowMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TVShowMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TVShowCountAggregateOutputType = {
    id: number
    title: number
    description: number
    imageUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TVShowAvgAggregateInputType = {
    id?: true
  }

  export type TVShowSumAggregateInputType = {
    id?: true
  }

  export type TVShowMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TVShowMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TVShowCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TVShowAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TVShow to aggregate.
     */
    where?: TVShowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TVShows to fetch.
     */
    orderBy?: TVShowOrderByWithRelationInput | TVShowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TVShowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TVShows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TVShows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TVShows
    **/
    _count?: true | TVShowCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TVShowAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TVShowSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TVShowMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TVShowMaxAggregateInputType
  }

  export type GetTVShowAggregateType<T extends TVShowAggregateArgs> = {
        [P in keyof T & keyof AggregateTVShow]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTVShow[P]>
      : GetScalarType<T[P], AggregateTVShow[P]>
  }




  export type TVShowGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TVShowWhereInput
    orderBy?: TVShowOrderByWithAggregationInput | TVShowOrderByWithAggregationInput[]
    by: TVShowScalarFieldEnum[] | TVShowScalarFieldEnum
    having?: TVShowScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TVShowCountAggregateInputType | true
    _avg?: TVShowAvgAggregateInputType
    _sum?: TVShowSumAggregateInputType
    _min?: TVShowMinAggregateInputType
    _max?: TVShowMaxAggregateInputType
  }

  export type TVShowGroupByOutputType = {
    id: number
    title: string
    description: string | null
    imageUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: TVShowCountAggregateOutputType | null
    _avg: TVShowAvgAggregateOutputType | null
    _sum: TVShowSumAggregateOutputType | null
    _min: TVShowMinAggregateOutputType | null
    _max: TVShowMaxAggregateOutputType | null
  }

  type GetTVShowGroupByPayload<T extends TVShowGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TVShowGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TVShowGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TVShowGroupByOutputType[P]>
            : GetScalarType<T[P], TVShowGroupByOutputType[P]>
        }
      >
    >


  export type TVShowSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Vote?: boolean | TVShow$VoteArgs<ExtArgs>
    _count?: boolean | TVShowCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tVShow"]>

  export type TVShowSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tVShow"]>

  export type TVShowSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tVShow"]>

  export type TVShowSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TVShowOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "imageUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["tVShow"]>
  export type TVShowInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Vote?: boolean | TVShow$VoteArgs<ExtArgs>
    _count?: boolean | TVShowCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TVShowIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TVShowIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TVShowPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TVShow"
    objects: {
      Vote: Prisma.$VotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string | null
      imageUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tVShow"]>
    composites: {}
  }

  type TVShowGetPayload<S extends boolean | null | undefined | TVShowDefaultArgs> = $Result.GetResult<Prisma.$TVShowPayload, S>

  type TVShowCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TVShowFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TVShowCountAggregateInputType | true
    }

  export interface TVShowDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TVShow'], meta: { name: 'TVShow' } }
    /**
     * Find zero or one TVShow that matches the filter.
     * @param {TVShowFindUniqueArgs} args - Arguments to find a TVShow
     * @example
     * // Get one TVShow
     * const tVShow = await prisma.tVShow.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TVShowFindUniqueArgs>(args: SelectSubset<T, TVShowFindUniqueArgs<ExtArgs>>): Prisma__TVShowClient<$Result.GetResult<Prisma.$TVShowPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TVShow that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TVShowFindUniqueOrThrowArgs} args - Arguments to find a TVShow
     * @example
     * // Get one TVShow
     * const tVShow = await prisma.tVShow.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TVShowFindUniqueOrThrowArgs>(args: SelectSubset<T, TVShowFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TVShowClient<$Result.GetResult<Prisma.$TVShowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TVShow that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TVShowFindFirstArgs} args - Arguments to find a TVShow
     * @example
     * // Get one TVShow
     * const tVShow = await prisma.tVShow.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TVShowFindFirstArgs>(args?: SelectSubset<T, TVShowFindFirstArgs<ExtArgs>>): Prisma__TVShowClient<$Result.GetResult<Prisma.$TVShowPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TVShow that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TVShowFindFirstOrThrowArgs} args - Arguments to find a TVShow
     * @example
     * // Get one TVShow
     * const tVShow = await prisma.tVShow.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TVShowFindFirstOrThrowArgs>(args?: SelectSubset<T, TVShowFindFirstOrThrowArgs<ExtArgs>>): Prisma__TVShowClient<$Result.GetResult<Prisma.$TVShowPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TVShows that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TVShowFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TVShows
     * const tVShows = await prisma.tVShow.findMany()
     * 
     * // Get first 10 TVShows
     * const tVShows = await prisma.tVShow.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tVShowWithIdOnly = await prisma.tVShow.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TVShowFindManyArgs>(args?: SelectSubset<T, TVShowFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TVShowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TVShow.
     * @param {TVShowCreateArgs} args - Arguments to create a TVShow.
     * @example
     * // Create one TVShow
     * const TVShow = await prisma.tVShow.create({
     *   data: {
     *     // ... data to create a TVShow
     *   }
     * })
     * 
     */
    create<T extends TVShowCreateArgs>(args: SelectSubset<T, TVShowCreateArgs<ExtArgs>>): Prisma__TVShowClient<$Result.GetResult<Prisma.$TVShowPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TVShows.
     * @param {TVShowCreateManyArgs} args - Arguments to create many TVShows.
     * @example
     * // Create many TVShows
     * const tVShow = await prisma.tVShow.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TVShowCreateManyArgs>(args?: SelectSubset<T, TVShowCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TVShows and returns the data saved in the database.
     * @param {TVShowCreateManyAndReturnArgs} args - Arguments to create many TVShows.
     * @example
     * // Create many TVShows
     * const tVShow = await prisma.tVShow.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TVShows and only return the `id`
     * const tVShowWithIdOnly = await prisma.tVShow.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TVShowCreateManyAndReturnArgs>(args?: SelectSubset<T, TVShowCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TVShowPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TVShow.
     * @param {TVShowDeleteArgs} args - Arguments to delete one TVShow.
     * @example
     * // Delete one TVShow
     * const TVShow = await prisma.tVShow.delete({
     *   where: {
     *     // ... filter to delete one TVShow
     *   }
     * })
     * 
     */
    delete<T extends TVShowDeleteArgs>(args: SelectSubset<T, TVShowDeleteArgs<ExtArgs>>): Prisma__TVShowClient<$Result.GetResult<Prisma.$TVShowPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TVShow.
     * @param {TVShowUpdateArgs} args - Arguments to update one TVShow.
     * @example
     * // Update one TVShow
     * const tVShow = await prisma.tVShow.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TVShowUpdateArgs>(args: SelectSubset<T, TVShowUpdateArgs<ExtArgs>>): Prisma__TVShowClient<$Result.GetResult<Prisma.$TVShowPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TVShows.
     * @param {TVShowDeleteManyArgs} args - Arguments to filter TVShows to delete.
     * @example
     * // Delete a few TVShows
     * const { count } = await prisma.tVShow.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TVShowDeleteManyArgs>(args?: SelectSubset<T, TVShowDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TVShows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TVShowUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TVShows
     * const tVShow = await prisma.tVShow.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TVShowUpdateManyArgs>(args: SelectSubset<T, TVShowUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TVShows and returns the data updated in the database.
     * @param {TVShowUpdateManyAndReturnArgs} args - Arguments to update many TVShows.
     * @example
     * // Update many TVShows
     * const tVShow = await prisma.tVShow.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TVShows and only return the `id`
     * const tVShowWithIdOnly = await prisma.tVShow.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TVShowUpdateManyAndReturnArgs>(args: SelectSubset<T, TVShowUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TVShowPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TVShow.
     * @param {TVShowUpsertArgs} args - Arguments to update or create a TVShow.
     * @example
     * // Update or create a TVShow
     * const tVShow = await prisma.tVShow.upsert({
     *   create: {
     *     // ... data to create a TVShow
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TVShow we want to update
     *   }
     * })
     */
    upsert<T extends TVShowUpsertArgs>(args: SelectSubset<T, TVShowUpsertArgs<ExtArgs>>): Prisma__TVShowClient<$Result.GetResult<Prisma.$TVShowPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TVShows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TVShowCountArgs} args - Arguments to filter TVShows to count.
     * @example
     * // Count the number of TVShows
     * const count = await prisma.tVShow.count({
     *   where: {
     *     // ... the filter for the TVShows we want to count
     *   }
     * })
    **/
    count<T extends TVShowCountArgs>(
      args?: Subset<T, TVShowCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TVShowCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TVShow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TVShowAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TVShowAggregateArgs>(args: Subset<T, TVShowAggregateArgs>): Prisma.PrismaPromise<GetTVShowAggregateType<T>>

    /**
     * Group by TVShow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TVShowGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TVShowGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TVShowGroupByArgs['orderBy'] }
        : { orderBy?: TVShowGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TVShowGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTVShowGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TVShow model
   */
  readonly fields: TVShowFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TVShow.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TVShowClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Vote<T extends TVShow$VoteArgs<ExtArgs> = {}>(args?: Subset<T, TVShow$VoteArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TVShow model
   */
  interface TVShowFieldRefs {
    readonly id: FieldRef<"TVShow", 'Int'>
    readonly title: FieldRef<"TVShow", 'String'>
    readonly description: FieldRef<"TVShow", 'String'>
    readonly imageUrl: FieldRef<"TVShow", 'String'>
    readonly createdAt: FieldRef<"TVShow", 'DateTime'>
    readonly updatedAt: FieldRef<"TVShow", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TVShow findUnique
   */
  export type TVShowFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TVShow
     */
    select?: TVShowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TVShow
     */
    omit?: TVShowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TVShowInclude<ExtArgs> | null
    /**
     * Filter, which TVShow to fetch.
     */
    where: TVShowWhereUniqueInput
  }

  /**
   * TVShow findUniqueOrThrow
   */
  export type TVShowFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TVShow
     */
    select?: TVShowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TVShow
     */
    omit?: TVShowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TVShowInclude<ExtArgs> | null
    /**
     * Filter, which TVShow to fetch.
     */
    where: TVShowWhereUniqueInput
  }

  /**
   * TVShow findFirst
   */
  export type TVShowFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TVShow
     */
    select?: TVShowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TVShow
     */
    omit?: TVShowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TVShowInclude<ExtArgs> | null
    /**
     * Filter, which TVShow to fetch.
     */
    where?: TVShowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TVShows to fetch.
     */
    orderBy?: TVShowOrderByWithRelationInput | TVShowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TVShows.
     */
    cursor?: TVShowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TVShows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TVShows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TVShows.
     */
    distinct?: TVShowScalarFieldEnum | TVShowScalarFieldEnum[]
  }

  /**
   * TVShow findFirstOrThrow
   */
  export type TVShowFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TVShow
     */
    select?: TVShowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TVShow
     */
    omit?: TVShowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TVShowInclude<ExtArgs> | null
    /**
     * Filter, which TVShow to fetch.
     */
    where?: TVShowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TVShows to fetch.
     */
    orderBy?: TVShowOrderByWithRelationInput | TVShowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TVShows.
     */
    cursor?: TVShowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TVShows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TVShows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TVShows.
     */
    distinct?: TVShowScalarFieldEnum | TVShowScalarFieldEnum[]
  }

  /**
   * TVShow findMany
   */
  export type TVShowFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TVShow
     */
    select?: TVShowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TVShow
     */
    omit?: TVShowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TVShowInclude<ExtArgs> | null
    /**
     * Filter, which TVShows to fetch.
     */
    where?: TVShowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TVShows to fetch.
     */
    orderBy?: TVShowOrderByWithRelationInput | TVShowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TVShows.
     */
    cursor?: TVShowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TVShows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TVShows.
     */
    skip?: number
    distinct?: TVShowScalarFieldEnum | TVShowScalarFieldEnum[]
  }

  /**
   * TVShow create
   */
  export type TVShowCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TVShow
     */
    select?: TVShowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TVShow
     */
    omit?: TVShowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TVShowInclude<ExtArgs> | null
    /**
     * The data needed to create a TVShow.
     */
    data: XOR<TVShowCreateInput, TVShowUncheckedCreateInput>
  }

  /**
   * TVShow createMany
   */
  export type TVShowCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TVShows.
     */
    data: TVShowCreateManyInput | TVShowCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TVShow createManyAndReturn
   */
  export type TVShowCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TVShow
     */
    select?: TVShowSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TVShow
     */
    omit?: TVShowOmit<ExtArgs> | null
    /**
     * The data used to create many TVShows.
     */
    data: TVShowCreateManyInput | TVShowCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TVShow update
   */
  export type TVShowUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TVShow
     */
    select?: TVShowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TVShow
     */
    omit?: TVShowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TVShowInclude<ExtArgs> | null
    /**
     * The data needed to update a TVShow.
     */
    data: XOR<TVShowUpdateInput, TVShowUncheckedUpdateInput>
    /**
     * Choose, which TVShow to update.
     */
    where: TVShowWhereUniqueInput
  }

  /**
   * TVShow updateMany
   */
  export type TVShowUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TVShows.
     */
    data: XOR<TVShowUpdateManyMutationInput, TVShowUncheckedUpdateManyInput>
    /**
     * Filter which TVShows to update
     */
    where?: TVShowWhereInput
    /**
     * Limit how many TVShows to update.
     */
    limit?: number
  }

  /**
   * TVShow updateManyAndReturn
   */
  export type TVShowUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TVShow
     */
    select?: TVShowSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TVShow
     */
    omit?: TVShowOmit<ExtArgs> | null
    /**
     * The data used to update TVShows.
     */
    data: XOR<TVShowUpdateManyMutationInput, TVShowUncheckedUpdateManyInput>
    /**
     * Filter which TVShows to update
     */
    where?: TVShowWhereInput
    /**
     * Limit how many TVShows to update.
     */
    limit?: number
  }

  /**
   * TVShow upsert
   */
  export type TVShowUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TVShow
     */
    select?: TVShowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TVShow
     */
    omit?: TVShowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TVShowInclude<ExtArgs> | null
    /**
     * The filter to search for the TVShow to update in case it exists.
     */
    where: TVShowWhereUniqueInput
    /**
     * In case the TVShow found by the `where` argument doesn't exist, create a new TVShow with this data.
     */
    create: XOR<TVShowCreateInput, TVShowUncheckedCreateInput>
    /**
     * In case the TVShow was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TVShowUpdateInput, TVShowUncheckedUpdateInput>
  }

  /**
   * TVShow delete
   */
  export type TVShowDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TVShow
     */
    select?: TVShowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TVShow
     */
    omit?: TVShowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TVShowInclude<ExtArgs> | null
    /**
     * Filter which TVShow to delete.
     */
    where: TVShowWhereUniqueInput
  }

  /**
   * TVShow deleteMany
   */
  export type TVShowDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TVShows to delete
     */
    where?: TVShowWhereInput
    /**
     * Limit how many TVShows to delete.
     */
    limit?: number
  }

  /**
   * TVShow.Vote
   */
  export type TVShow$VoteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    where?: VoteWhereInput
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    cursor?: VoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[]
  }

  /**
   * TVShow without action
   */
  export type TVShowDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TVShow
     */
    select?: TVShowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TVShow
     */
    omit?: TVShowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TVShowInclude<ExtArgs> | null
  }


  /**
   * Model Vote
   */

  export type AggregateVote = {
    _count: VoteCountAggregateOutputType | null
    _avg: VoteAvgAggregateOutputType | null
    _sum: VoteSumAggregateOutputType | null
    _min: VoteMinAggregateOutputType | null
    _max: VoteMaxAggregateOutputType | null
  }

  export type VoteAvgAggregateOutputType = {
    id: number | null
    celebrityId: number | null
    tvShowId: number | null
  }

  export type VoteSumAggregateOutputType = {
    id: number | null
    celebrityId: number | null
    tvShowId: number | null
  }

  export type VoteMinAggregateOutputType = {
    id: number | null
    celebrityId: number | null
    tvShowId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VoteMaxAggregateOutputType = {
    id: number | null
    celebrityId: number | null
    tvShowId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VoteCountAggregateOutputType = {
    id: number
    celebrityId: number
    tvShowId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VoteAvgAggregateInputType = {
    id?: true
    celebrityId?: true
    tvShowId?: true
  }

  export type VoteSumAggregateInputType = {
    id?: true
    celebrityId?: true
    tvShowId?: true
  }

  export type VoteMinAggregateInputType = {
    id?: true
    celebrityId?: true
    tvShowId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VoteMaxAggregateInputType = {
    id?: true
    celebrityId?: true
    tvShowId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VoteCountAggregateInputType = {
    id?: true
    celebrityId?: true
    tvShowId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vote to aggregate.
     */
    where?: VoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Votes to fetch.
     */
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Votes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Votes
    **/
    _count?: true | VoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VoteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VoteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VoteMaxAggregateInputType
  }

  export type GetVoteAggregateType<T extends VoteAggregateArgs> = {
        [P in keyof T & keyof AggregateVote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVote[P]>
      : GetScalarType<T[P], AggregateVote[P]>
  }




  export type VoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoteWhereInput
    orderBy?: VoteOrderByWithAggregationInput | VoteOrderByWithAggregationInput[]
    by: VoteScalarFieldEnum[] | VoteScalarFieldEnum
    having?: VoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VoteCountAggregateInputType | true
    _avg?: VoteAvgAggregateInputType
    _sum?: VoteSumAggregateInputType
    _min?: VoteMinAggregateInputType
    _max?: VoteMaxAggregateInputType
  }

  export type VoteGroupByOutputType = {
    id: number
    celebrityId: number | null
    tvShowId: number | null
    createdAt: Date
    updatedAt: Date
    _count: VoteCountAggregateOutputType | null
    _avg: VoteAvgAggregateOutputType | null
    _sum: VoteSumAggregateOutputType | null
    _min: VoteMinAggregateOutputType | null
    _max: VoteMaxAggregateOutputType | null
  }

  type GetVoteGroupByPayload<T extends VoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VoteGroupByOutputType[P]>
            : GetScalarType<T[P], VoteGroupByOutputType[P]>
        }
      >
    >


  export type VoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    celebrityId?: boolean
    tvShowId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Celebrity?: boolean | Vote$CelebrityArgs<ExtArgs>
    TVShow?: boolean | Vote$TVShowArgs<ExtArgs>
  }, ExtArgs["result"]["vote"]>

  export type VoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    celebrityId?: boolean
    tvShowId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Celebrity?: boolean | Vote$CelebrityArgs<ExtArgs>
    TVShow?: boolean | Vote$TVShowArgs<ExtArgs>
  }, ExtArgs["result"]["vote"]>

  export type VoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    celebrityId?: boolean
    tvShowId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Celebrity?: boolean | Vote$CelebrityArgs<ExtArgs>
    TVShow?: boolean | Vote$TVShowArgs<ExtArgs>
  }, ExtArgs["result"]["vote"]>

  export type VoteSelectScalar = {
    id?: boolean
    celebrityId?: boolean
    tvShowId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "celebrityId" | "tvShowId" | "createdAt" | "updatedAt", ExtArgs["result"]["vote"]>
  export type VoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Celebrity?: boolean | Vote$CelebrityArgs<ExtArgs>
    TVShow?: boolean | Vote$TVShowArgs<ExtArgs>
  }
  export type VoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Celebrity?: boolean | Vote$CelebrityArgs<ExtArgs>
    TVShow?: boolean | Vote$TVShowArgs<ExtArgs>
  }
  export type VoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Celebrity?: boolean | Vote$CelebrityArgs<ExtArgs>
    TVShow?: boolean | Vote$TVShowArgs<ExtArgs>
  }

  export type $VotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vote"
    objects: {
      Celebrity: Prisma.$CelebrityPayload<ExtArgs> | null
      TVShow: Prisma.$TVShowPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      celebrityId: number | null
      tvShowId: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["vote"]>
    composites: {}
  }

  type VoteGetPayload<S extends boolean | null | undefined | VoteDefaultArgs> = $Result.GetResult<Prisma.$VotePayload, S>

  type VoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VoteCountAggregateInputType | true
    }

  export interface VoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vote'], meta: { name: 'Vote' } }
    /**
     * Find zero or one Vote that matches the filter.
     * @param {VoteFindUniqueArgs} args - Arguments to find a Vote
     * @example
     * // Get one Vote
     * const vote = await prisma.vote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VoteFindUniqueArgs>(args: SelectSubset<T, VoteFindUniqueArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Vote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VoteFindUniqueOrThrowArgs} args - Arguments to find a Vote
     * @example
     * // Get one Vote
     * const vote = await prisma.vote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VoteFindUniqueOrThrowArgs>(args: SelectSubset<T, VoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteFindFirstArgs} args - Arguments to find a Vote
     * @example
     * // Get one Vote
     * const vote = await prisma.vote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VoteFindFirstArgs>(args?: SelectSubset<T, VoteFindFirstArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteFindFirstOrThrowArgs} args - Arguments to find a Vote
     * @example
     * // Get one Vote
     * const vote = await prisma.vote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VoteFindFirstOrThrowArgs>(args?: SelectSubset<T, VoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Votes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Votes
     * const votes = await prisma.vote.findMany()
     * 
     * // Get first 10 Votes
     * const votes = await prisma.vote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const voteWithIdOnly = await prisma.vote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VoteFindManyArgs>(args?: SelectSubset<T, VoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Vote.
     * @param {VoteCreateArgs} args - Arguments to create a Vote.
     * @example
     * // Create one Vote
     * const Vote = await prisma.vote.create({
     *   data: {
     *     // ... data to create a Vote
     *   }
     * })
     * 
     */
    create<T extends VoteCreateArgs>(args: SelectSubset<T, VoteCreateArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Votes.
     * @param {VoteCreateManyArgs} args - Arguments to create many Votes.
     * @example
     * // Create many Votes
     * const vote = await prisma.vote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VoteCreateManyArgs>(args?: SelectSubset<T, VoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Votes and returns the data saved in the database.
     * @param {VoteCreateManyAndReturnArgs} args - Arguments to create many Votes.
     * @example
     * // Create many Votes
     * const vote = await prisma.vote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Votes and only return the `id`
     * const voteWithIdOnly = await prisma.vote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VoteCreateManyAndReturnArgs>(args?: SelectSubset<T, VoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Vote.
     * @param {VoteDeleteArgs} args - Arguments to delete one Vote.
     * @example
     * // Delete one Vote
     * const Vote = await prisma.vote.delete({
     *   where: {
     *     // ... filter to delete one Vote
     *   }
     * })
     * 
     */
    delete<T extends VoteDeleteArgs>(args: SelectSubset<T, VoteDeleteArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Vote.
     * @param {VoteUpdateArgs} args - Arguments to update one Vote.
     * @example
     * // Update one Vote
     * const vote = await prisma.vote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VoteUpdateArgs>(args: SelectSubset<T, VoteUpdateArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Votes.
     * @param {VoteDeleteManyArgs} args - Arguments to filter Votes to delete.
     * @example
     * // Delete a few Votes
     * const { count } = await prisma.vote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VoteDeleteManyArgs>(args?: SelectSubset<T, VoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Votes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Votes
     * const vote = await prisma.vote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VoteUpdateManyArgs>(args: SelectSubset<T, VoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Votes and returns the data updated in the database.
     * @param {VoteUpdateManyAndReturnArgs} args - Arguments to update many Votes.
     * @example
     * // Update many Votes
     * const vote = await prisma.vote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Votes and only return the `id`
     * const voteWithIdOnly = await prisma.vote.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VoteUpdateManyAndReturnArgs>(args: SelectSubset<T, VoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Vote.
     * @param {VoteUpsertArgs} args - Arguments to update or create a Vote.
     * @example
     * // Update or create a Vote
     * const vote = await prisma.vote.upsert({
     *   create: {
     *     // ... data to create a Vote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vote we want to update
     *   }
     * })
     */
    upsert<T extends VoteUpsertArgs>(args: SelectSubset<T, VoteUpsertArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Votes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteCountArgs} args - Arguments to filter Votes to count.
     * @example
     * // Count the number of Votes
     * const count = await prisma.vote.count({
     *   where: {
     *     // ... the filter for the Votes we want to count
     *   }
     * })
    **/
    count<T extends VoteCountArgs>(
      args?: Subset<T, VoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VoteAggregateArgs>(args: Subset<T, VoteAggregateArgs>): Prisma.PrismaPromise<GetVoteAggregateType<T>>

    /**
     * Group by Vote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VoteGroupByArgs['orderBy'] }
        : { orderBy?: VoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vote model
   */
  readonly fields: VoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Celebrity<T extends Vote$CelebrityArgs<ExtArgs> = {}>(args?: Subset<T, Vote$CelebrityArgs<ExtArgs>>): Prisma__CelebrityClient<$Result.GetResult<Prisma.$CelebrityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    TVShow<T extends Vote$TVShowArgs<ExtArgs> = {}>(args?: Subset<T, Vote$TVShowArgs<ExtArgs>>): Prisma__TVShowClient<$Result.GetResult<Prisma.$TVShowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Vote model
   */
  interface VoteFieldRefs {
    readonly id: FieldRef<"Vote", 'Int'>
    readonly celebrityId: FieldRef<"Vote", 'Int'>
    readonly tvShowId: FieldRef<"Vote", 'Int'>
    readonly createdAt: FieldRef<"Vote", 'DateTime'>
    readonly updatedAt: FieldRef<"Vote", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Vote findUnique
   */
  export type VoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter, which Vote to fetch.
     */
    where: VoteWhereUniqueInput
  }

  /**
   * Vote findUniqueOrThrow
   */
  export type VoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter, which Vote to fetch.
     */
    where: VoteWhereUniqueInput
  }

  /**
   * Vote findFirst
   */
  export type VoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter, which Vote to fetch.
     */
    where?: VoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Votes to fetch.
     */
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Votes.
     */
    cursor?: VoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Votes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Votes.
     */
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[]
  }

  /**
   * Vote findFirstOrThrow
   */
  export type VoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter, which Vote to fetch.
     */
    where?: VoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Votes to fetch.
     */
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Votes.
     */
    cursor?: VoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Votes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Votes.
     */
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[]
  }

  /**
   * Vote findMany
   */
  export type VoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter, which Votes to fetch.
     */
    where?: VoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Votes to fetch.
     */
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Votes.
     */
    cursor?: VoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Votes.
     */
    skip?: number
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[]
  }

  /**
   * Vote create
   */
  export type VoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * The data needed to create a Vote.
     */
    data: XOR<VoteCreateInput, VoteUncheckedCreateInput>
  }

  /**
   * Vote createMany
   */
  export type VoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Votes.
     */
    data: VoteCreateManyInput | VoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vote createManyAndReturn
   */
  export type VoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * The data used to create many Votes.
     */
    data: VoteCreateManyInput | VoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vote update
   */
  export type VoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * The data needed to update a Vote.
     */
    data: XOR<VoteUpdateInput, VoteUncheckedUpdateInput>
    /**
     * Choose, which Vote to update.
     */
    where: VoteWhereUniqueInput
  }

  /**
   * Vote updateMany
   */
  export type VoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Votes.
     */
    data: XOR<VoteUpdateManyMutationInput, VoteUncheckedUpdateManyInput>
    /**
     * Filter which Votes to update
     */
    where?: VoteWhereInput
    /**
     * Limit how many Votes to update.
     */
    limit?: number
  }

  /**
   * Vote updateManyAndReturn
   */
  export type VoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * The data used to update Votes.
     */
    data: XOR<VoteUpdateManyMutationInput, VoteUncheckedUpdateManyInput>
    /**
     * Filter which Votes to update
     */
    where?: VoteWhereInput
    /**
     * Limit how many Votes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vote upsert
   */
  export type VoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * The filter to search for the Vote to update in case it exists.
     */
    where: VoteWhereUniqueInput
    /**
     * In case the Vote found by the `where` argument doesn't exist, create a new Vote with this data.
     */
    create: XOR<VoteCreateInput, VoteUncheckedCreateInput>
    /**
     * In case the Vote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VoteUpdateInput, VoteUncheckedUpdateInput>
  }

  /**
   * Vote delete
   */
  export type VoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter which Vote to delete.
     */
    where: VoteWhereUniqueInput
  }

  /**
   * Vote deleteMany
   */
  export type VoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Votes to delete
     */
    where?: VoteWhereInput
    /**
     * Limit how many Votes to delete.
     */
    limit?: number
  }

  /**
   * Vote.Celebrity
   */
  export type Vote$CelebrityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Celebrity
     */
    select?: CelebritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Celebrity
     */
    omit?: CelebrityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CelebrityInclude<ExtArgs> | null
    where?: CelebrityWhereInput
  }

  /**
   * Vote.TVShow
   */
  export type Vote$TVShowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TVShow
     */
    select?: TVShowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TVShow
     */
    omit?: TVShowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TVShowInclude<ExtArgs> | null
    where?: TVShowWhereInput
  }

  /**
   * Vote without action
   */
  export type VoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CelebrityScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    imageUrl: 'imageUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CelebrityScalarFieldEnum = (typeof CelebrityScalarFieldEnum)[keyof typeof CelebrityScalarFieldEnum]


  export const TVShowScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    imageUrl: 'imageUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TVShowScalarFieldEnum = (typeof TVShowScalarFieldEnum)[keyof typeof TVShowScalarFieldEnum]


  export const VoteScalarFieldEnum: {
    id: 'id',
    celebrityId: 'celebrityId',
    tvShowId: 'tvShowId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VoteScalarFieldEnum = (typeof VoteScalarFieldEnum)[keyof typeof VoteScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type CelebrityWhereInput = {
    AND?: CelebrityWhereInput | CelebrityWhereInput[]
    OR?: CelebrityWhereInput[]
    NOT?: CelebrityWhereInput | CelebrityWhereInput[]
    id?: IntFilter<"Celebrity"> | number
    name?: StringFilter<"Celebrity"> | string
    description?: StringNullableFilter<"Celebrity"> | string | null
    imageUrl?: StringNullableFilter<"Celebrity"> | string | null
    createdAt?: DateTimeFilter<"Celebrity"> | Date | string
    updatedAt?: DateTimeFilter<"Celebrity"> | Date | string
    Vote?: VoteListRelationFilter
  }

  export type CelebrityOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Vote?: VoteOrderByRelationAggregateInput
  }

  export type CelebrityWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CelebrityWhereInput | CelebrityWhereInput[]
    OR?: CelebrityWhereInput[]
    NOT?: CelebrityWhereInput | CelebrityWhereInput[]
    name?: StringFilter<"Celebrity"> | string
    description?: StringNullableFilter<"Celebrity"> | string | null
    imageUrl?: StringNullableFilter<"Celebrity"> | string | null
    createdAt?: DateTimeFilter<"Celebrity"> | Date | string
    updatedAt?: DateTimeFilter<"Celebrity"> | Date | string
    Vote?: VoteListRelationFilter
  }, "id">

  export type CelebrityOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CelebrityCountOrderByAggregateInput
    _avg?: CelebrityAvgOrderByAggregateInput
    _max?: CelebrityMaxOrderByAggregateInput
    _min?: CelebrityMinOrderByAggregateInput
    _sum?: CelebritySumOrderByAggregateInput
  }

  export type CelebrityScalarWhereWithAggregatesInput = {
    AND?: CelebrityScalarWhereWithAggregatesInput | CelebrityScalarWhereWithAggregatesInput[]
    OR?: CelebrityScalarWhereWithAggregatesInput[]
    NOT?: CelebrityScalarWhereWithAggregatesInput | CelebrityScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Celebrity"> | number
    name?: StringWithAggregatesFilter<"Celebrity"> | string
    description?: StringNullableWithAggregatesFilter<"Celebrity"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"Celebrity"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Celebrity"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Celebrity"> | Date | string
  }

  export type TVShowWhereInput = {
    AND?: TVShowWhereInput | TVShowWhereInput[]
    OR?: TVShowWhereInput[]
    NOT?: TVShowWhereInput | TVShowWhereInput[]
    id?: IntFilter<"TVShow"> | number
    title?: StringFilter<"TVShow"> | string
    description?: StringNullableFilter<"TVShow"> | string | null
    imageUrl?: StringNullableFilter<"TVShow"> | string | null
    createdAt?: DateTimeFilter<"TVShow"> | Date | string
    updatedAt?: DateTimeFilter<"TVShow"> | Date | string
    Vote?: VoteListRelationFilter
  }

  export type TVShowOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Vote?: VoteOrderByRelationAggregateInput
  }

  export type TVShowWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TVShowWhereInput | TVShowWhereInput[]
    OR?: TVShowWhereInput[]
    NOT?: TVShowWhereInput | TVShowWhereInput[]
    title?: StringFilter<"TVShow"> | string
    description?: StringNullableFilter<"TVShow"> | string | null
    imageUrl?: StringNullableFilter<"TVShow"> | string | null
    createdAt?: DateTimeFilter<"TVShow"> | Date | string
    updatedAt?: DateTimeFilter<"TVShow"> | Date | string
    Vote?: VoteListRelationFilter
  }, "id">

  export type TVShowOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TVShowCountOrderByAggregateInput
    _avg?: TVShowAvgOrderByAggregateInput
    _max?: TVShowMaxOrderByAggregateInput
    _min?: TVShowMinOrderByAggregateInput
    _sum?: TVShowSumOrderByAggregateInput
  }

  export type TVShowScalarWhereWithAggregatesInput = {
    AND?: TVShowScalarWhereWithAggregatesInput | TVShowScalarWhereWithAggregatesInput[]
    OR?: TVShowScalarWhereWithAggregatesInput[]
    NOT?: TVShowScalarWhereWithAggregatesInput | TVShowScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TVShow"> | number
    title?: StringWithAggregatesFilter<"TVShow"> | string
    description?: StringNullableWithAggregatesFilter<"TVShow"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"TVShow"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TVShow"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TVShow"> | Date | string
  }

  export type VoteWhereInput = {
    AND?: VoteWhereInput | VoteWhereInput[]
    OR?: VoteWhereInput[]
    NOT?: VoteWhereInput | VoteWhereInput[]
    id?: IntFilter<"Vote"> | number
    celebrityId?: IntNullableFilter<"Vote"> | number | null
    tvShowId?: IntNullableFilter<"Vote"> | number | null
    createdAt?: DateTimeFilter<"Vote"> | Date | string
    updatedAt?: DateTimeFilter<"Vote"> | Date | string
    Celebrity?: XOR<CelebrityNullableScalarRelationFilter, CelebrityWhereInput> | null
    TVShow?: XOR<TVShowNullableScalarRelationFilter, TVShowWhereInput> | null
  }

  export type VoteOrderByWithRelationInput = {
    id?: SortOrder
    celebrityId?: SortOrderInput | SortOrder
    tvShowId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Celebrity?: CelebrityOrderByWithRelationInput
    TVShow?: TVShowOrderByWithRelationInput
  }

  export type VoteWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: VoteWhereInput | VoteWhereInput[]
    OR?: VoteWhereInput[]
    NOT?: VoteWhereInput | VoteWhereInput[]
    celebrityId?: IntNullableFilter<"Vote"> | number | null
    tvShowId?: IntNullableFilter<"Vote"> | number | null
    createdAt?: DateTimeFilter<"Vote"> | Date | string
    updatedAt?: DateTimeFilter<"Vote"> | Date | string
    Celebrity?: XOR<CelebrityNullableScalarRelationFilter, CelebrityWhereInput> | null
    TVShow?: XOR<TVShowNullableScalarRelationFilter, TVShowWhereInput> | null
  }, "id">

  export type VoteOrderByWithAggregationInput = {
    id?: SortOrder
    celebrityId?: SortOrderInput | SortOrder
    tvShowId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VoteCountOrderByAggregateInput
    _avg?: VoteAvgOrderByAggregateInput
    _max?: VoteMaxOrderByAggregateInput
    _min?: VoteMinOrderByAggregateInput
    _sum?: VoteSumOrderByAggregateInput
  }

  export type VoteScalarWhereWithAggregatesInput = {
    AND?: VoteScalarWhereWithAggregatesInput | VoteScalarWhereWithAggregatesInput[]
    OR?: VoteScalarWhereWithAggregatesInput[]
    NOT?: VoteScalarWhereWithAggregatesInput | VoteScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Vote"> | number
    celebrityId?: IntNullableWithAggregatesFilter<"Vote"> | number | null
    tvShowId?: IntNullableWithAggregatesFilter<"Vote"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Vote"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Vote"> | Date | string
  }

  export type CelebrityCreateInput = {
    name: string
    description?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    Vote?: VoteCreateNestedManyWithoutCelebrityInput
  }

  export type CelebrityUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    Vote?: VoteUncheckedCreateNestedManyWithoutCelebrityInput
  }

  export type CelebrityUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Vote?: VoteUpdateManyWithoutCelebrityNestedInput
  }

  export type CelebrityUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Vote?: VoteUncheckedUpdateManyWithoutCelebrityNestedInput
  }

  export type CelebrityCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type CelebrityUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CelebrityUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TVShowCreateInput = {
    title: string
    description?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    Vote?: VoteCreateNestedManyWithoutTVShowInput
  }

  export type TVShowUncheckedCreateInput = {
    id?: number
    title: string
    description?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    Vote?: VoteUncheckedCreateNestedManyWithoutTVShowInput
  }

  export type TVShowUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Vote?: VoteUpdateManyWithoutTVShowNestedInput
  }

  export type TVShowUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Vote?: VoteUncheckedUpdateManyWithoutTVShowNestedInput
  }

  export type TVShowCreateManyInput = {
    id?: number
    title: string
    description?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type TVShowUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TVShowUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteCreateInput = {
    createdAt?: Date | string
    updatedAt: Date | string
    Celebrity?: CelebrityCreateNestedOneWithoutVoteInput
    TVShow?: TVShowCreateNestedOneWithoutVoteInput
  }

  export type VoteUncheckedCreateInput = {
    id?: number
    celebrityId?: number | null
    tvShowId?: number | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type VoteUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Celebrity?: CelebrityUpdateOneWithoutVoteNestedInput
    TVShow?: TVShowUpdateOneWithoutVoteNestedInput
  }

  export type VoteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    celebrityId?: NullableIntFieldUpdateOperationsInput | number | null
    tvShowId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteCreateManyInput = {
    id?: number
    celebrityId?: number | null
    tvShowId?: number | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type VoteUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    celebrityId?: NullableIntFieldUpdateOperationsInput | number | null
    tvShowId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type VoteListRelationFilter = {
    every?: VoteWhereInput
    some?: VoteWhereInput
    none?: VoteWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type VoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CelebrityCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CelebrityAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CelebrityMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CelebrityMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CelebritySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type TVShowCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TVShowAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TVShowMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TVShowMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TVShowSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type CelebrityNullableScalarRelationFilter = {
    is?: CelebrityWhereInput | null
    isNot?: CelebrityWhereInput | null
  }

  export type TVShowNullableScalarRelationFilter = {
    is?: TVShowWhereInput | null
    isNot?: TVShowWhereInput | null
  }

  export type VoteCountOrderByAggregateInput = {
    id?: SortOrder
    celebrityId?: SortOrder
    tvShowId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VoteAvgOrderByAggregateInput = {
    id?: SortOrder
    celebrityId?: SortOrder
    tvShowId?: SortOrder
  }

  export type VoteMaxOrderByAggregateInput = {
    id?: SortOrder
    celebrityId?: SortOrder
    tvShowId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VoteMinOrderByAggregateInput = {
    id?: SortOrder
    celebrityId?: SortOrder
    tvShowId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VoteSumOrderByAggregateInput = {
    id?: SortOrder
    celebrityId?: SortOrder
    tvShowId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type VoteCreateNestedManyWithoutCelebrityInput = {
    create?: XOR<VoteCreateWithoutCelebrityInput, VoteUncheckedCreateWithoutCelebrityInput> | VoteCreateWithoutCelebrityInput[] | VoteUncheckedCreateWithoutCelebrityInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutCelebrityInput | VoteCreateOrConnectWithoutCelebrityInput[]
    createMany?: VoteCreateManyCelebrityInputEnvelope
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
  }

  export type VoteUncheckedCreateNestedManyWithoutCelebrityInput = {
    create?: XOR<VoteCreateWithoutCelebrityInput, VoteUncheckedCreateWithoutCelebrityInput> | VoteCreateWithoutCelebrityInput[] | VoteUncheckedCreateWithoutCelebrityInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutCelebrityInput | VoteCreateOrConnectWithoutCelebrityInput[]
    createMany?: VoteCreateManyCelebrityInputEnvelope
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type VoteUpdateManyWithoutCelebrityNestedInput = {
    create?: XOR<VoteCreateWithoutCelebrityInput, VoteUncheckedCreateWithoutCelebrityInput> | VoteCreateWithoutCelebrityInput[] | VoteUncheckedCreateWithoutCelebrityInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutCelebrityInput | VoteCreateOrConnectWithoutCelebrityInput[]
    upsert?: VoteUpsertWithWhereUniqueWithoutCelebrityInput | VoteUpsertWithWhereUniqueWithoutCelebrityInput[]
    createMany?: VoteCreateManyCelebrityInputEnvelope
    set?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    disconnect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    delete?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    update?: VoteUpdateWithWhereUniqueWithoutCelebrityInput | VoteUpdateWithWhereUniqueWithoutCelebrityInput[]
    updateMany?: VoteUpdateManyWithWhereWithoutCelebrityInput | VoteUpdateManyWithWhereWithoutCelebrityInput[]
    deleteMany?: VoteScalarWhereInput | VoteScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type VoteUncheckedUpdateManyWithoutCelebrityNestedInput = {
    create?: XOR<VoteCreateWithoutCelebrityInput, VoteUncheckedCreateWithoutCelebrityInput> | VoteCreateWithoutCelebrityInput[] | VoteUncheckedCreateWithoutCelebrityInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutCelebrityInput | VoteCreateOrConnectWithoutCelebrityInput[]
    upsert?: VoteUpsertWithWhereUniqueWithoutCelebrityInput | VoteUpsertWithWhereUniqueWithoutCelebrityInput[]
    createMany?: VoteCreateManyCelebrityInputEnvelope
    set?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    disconnect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    delete?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    update?: VoteUpdateWithWhereUniqueWithoutCelebrityInput | VoteUpdateWithWhereUniqueWithoutCelebrityInput[]
    updateMany?: VoteUpdateManyWithWhereWithoutCelebrityInput | VoteUpdateManyWithWhereWithoutCelebrityInput[]
    deleteMany?: VoteScalarWhereInput | VoteScalarWhereInput[]
  }

  export type VoteCreateNestedManyWithoutTVShowInput = {
    create?: XOR<VoteCreateWithoutTVShowInput, VoteUncheckedCreateWithoutTVShowInput> | VoteCreateWithoutTVShowInput[] | VoteUncheckedCreateWithoutTVShowInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutTVShowInput | VoteCreateOrConnectWithoutTVShowInput[]
    createMany?: VoteCreateManyTVShowInputEnvelope
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
  }

  export type VoteUncheckedCreateNestedManyWithoutTVShowInput = {
    create?: XOR<VoteCreateWithoutTVShowInput, VoteUncheckedCreateWithoutTVShowInput> | VoteCreateWithoutTVShowInput[] | VoteUncheckedCreateWithoutTVShowInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutTVShowInput | VoteCreateOrConnectWithoutTVShowInput[]
    createMany?: VoteCreateManyTVShowInputEnvelope
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
  }

  export type VoteUpdateManyWithoutTVShowNestedInput = {
    create?: XOR<VoteCreateWithoutTVShowInput, VoteUncheckedCreateWithoutTVShowInput> | VoteCreateWithoutTVShowInput[] | VoteUncheckedCreateWithoutTVShowInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutTVShowInput | VoteCreateOrConnectWithoutTVShowInput[]
    upsert?: VoteUpsertWithWhereUniqueWithoutTVShowInput | VoteUpsertWithWhereUniqueWithoutTVShowInput[]
    createMany?: VoteCreateManyTVShowInputEnvelope
    set?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    disconnect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    delete?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    update?: VoteUpdateWithWhereUniqueWithoutTVShowInput | VoteUpdateWithWhereUniqueWithoutTVShowInput[]
    updateMany?: VoteUpdateManyWithWhereWithoutTVShowInput | VoteUpdateManyWithWhereWithoutTVShowInput[]
    deleteMany?: VoteScalarWhereInput | VoteScalarWhereInput[]
  }

  export type VoteUncheckedUpdateManyWithoutTVShowNestedInput = {
    create?: XOR<VoteCreateWithoutTVShowInput, VoteUncheckedCreateWithoutTVShowInput> | VoteCreateWithoutTVShowInput[] | VoteUncheckedCreateWithoutTVShowInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutTVShowInput | VoteCreateOrConnectWithoutTVShowInput[]
    upsert?: VoteUpsertWithWhereUniqueWithoutTVShowInput | VoteUpsertWithWhereUniqueWithoutTVShowInput[]
    createMany?: VoteCreateManyTVShowInputEnvelope
    set?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    disconnect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    delete?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    update?: VoteUpdateWithWhereUniqueWithoutTVShowInput | VoteUpdateWithWhereUniqueWithoutTVShowInput[]
    updateMany?: VoteUpdateManyWithWhereWithoutTVShowInput | VoteUpdateManyWithWhereWithoutTVShowInput[]
    deleteMany?: VoteScalarWhereInput | VoteScalarWhereInput[]
  }

  export type CelebrityCreateNestedOneWithoutVoteInput = {
    create?: XOR<CelebrityCreateWithoutVoteInput, CelebrityUncheckedCreateWithoutVoteInput>
    connectOrCreate?: CelebrityCreateOrConnectWithoutVoteInput
    connect?: CelebrityWhereUniqueInput
  }

  export type TVShowCreateNestedOneWithoutVoteInput = {
    create?: XOR<TVShowCreateWithoutVoteInput, TVShowUncheckedCreateWithoutVoteInput>
    connectOrCreate?: TVShowCreateOrConnectWithoutVoteInput
    connect?: TVShowWhereUniqueInput
  }

  export type CelebrityUpdateOneWithoutVoteNestedInput = {
    create?: XOR<CelebrityCreateWithoutVoteInput, CelebrityUncheckedCreateWithoutVoteInput>
    connectOrCreate?: CelebrityCreateOrConnectWithoutVoteInput
    upsert?: CelebrityUpsertWithoutVoteInput
    disconnect?: CelebrityWhereInput | boolean
    delete?: CelebrityWhereInput | boolean
    connect?: CelebrityWhereUniqueInput
    update?: XOR<XOR<CelebrityUpdateToOneWithWhereWithoutVoteInput, CelebrityUpdateWithoutVoteInput>, CelebrityUncheckedUpdateWithoutVoteInput>
  }

  export type TVShowUpdateOneWithoutVoteNestedInput = {
    create?: XOR<TVShowCreateWithoutVoteInput, TVShowUncheckedCreateWithoutVoteInput>
    connectOrCreate?: TVShowCreateOrConnectWithoutVoteInput
    upsert?: TVShowUpsertWithoutVoteInput
    disconnect?: TVShowWhereInput | boolean
    delete?: TVShowWhereInput | boolean
    connect?: TVShowWhereUniqueInput
    update?: XOR<XOR<TVShowUpdateToOneWithWhereWithoutVoteInput, TVShowUpdateWithoutVoteInput>, TVShowUncheckedUpdateWithoutVoteInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type VoteCreateWithoutCelebrityInput = {
    createdAt?: Date | string
    updatedAt: Date | string
    TVShow?: TVShowCreateNestedOneWithoutVoteInput
  }

  export type VoteUncheckedCreateWithoutCelebrityInput = {
    id?: number
    tvShowId?: number | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type VoteCreateOrConnectWithoutCelebrityInput = {
    where: VoteWhereUniqueInput
    create: XOR<VoteCreateWithoutCelebrityInput, VoteUncheckedCreateWithoutCelebrityInput>
  }

  export type VoteCreateManyCelebrityInputEnvelope = {
    data: VoteCreateManyCelebrityInput | VoteCreateManyCelebrityInput[]
    skipDuplicates?: boolean
  }

  export type VoteUpsertWithWhereUniqueWithoutCelebrityInput = {
    where: VoteWhereUniqueInput
    update: XOR<VoteUpdateWithoutCelebrityInput, VoteUncheckedUpdateWithoutCelebrityInput>
    create: XOR<VoteCreateWithoutCelebrityInput, VoteUncheckedCreateWithoutCelebrityInput>
  }

  export type VoteUpdateWithWhereUniqueWithoutCelebrityInput = {
    where: VoteWhereUniqueInput
    data: XOR<VoteUpdateWithoutCelebrityInput, VoteUncheckedUpdateWithoutCelebrityInput>
  }

  export type VoteUpdateManyWithWhereWithoutCelebrityInput = {
    where: VoteScalarWhereInput
    data: XOR<VoteUpdateManyMutationInput, VoteUncheckedUpdateManyWithoutCelebrityInput>
  }

  export type VoteScalarWhereInput = {
    AND?: VoteScalarWhereInput | VoteScalarWhereInput[]
    OR?: VoteScalarWhereInput[]
    NOT?: VoteScalarWhereInput | VoteScalarWhereInput[]
    id?: IntFilter<"Vote"> | number
    celebrityId?: IntNullableFilter<"Vote"> | number | null
    tvShowId?: IntNullableFilter<"Vote"> | number | null
    createdAt?: DateTimeFilter<"Vote"> | Date | string
    updatedAt?: DateTimeFilter<"Vote"> | Date | string
  }

  export type VoteCreateWithoutTVShowInput = {
    createdAt?: Date | string
    updatedAt: Date | string
    Celebrity?: CelebrityCreateNestedOneWithoutVoteInput
  }

  export type VoteUncheckedCreateWithoutTVShowInput = {
    id?: number
    celebrityId?: number | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type VoteCreateOrConnectWithoutTVShowInput = {
    where: VoteWhereUniqueInput
    create: XOR<VoteCreateWithoutTVShowInput, VoteUncheckedCreateWithoutTVShowInput>
  }

  export type VoteCreateManyTVShowInputEnvelope = {
    data: VoteCreateManyTVShowInput | VoteCreateManyTVShowInput[]
    skipDuplicates?: boolean
  }

  export type VoteUpsertWithWhereUniqueWithoutTVShowInput = {
    where: VoteWhereUniqueInput
    update: XOR<VoteUpdateWithoutTVShowInput, VoteUncheckedUpdateWithoutTVShowInput>
    create: XOR<VoteCreateWithoutTVShowInput, VoteUncheckedCreateWithoutTVShowInput>
  }

  export type VoteUpdateWithWhereUniqueWithoutTVShowInput = {
    where: VoteWhereUniqueInput
    data: XOR<VoteUpdateWithoutTVShowInput, VoteUncheckedUpdateWithoutTVShowInput>
  }

  export type VoteUpdateManyWithWhereWithoutTVShowInput = {
    where: VoteScalarWhereInput
    data: XOR<VoteUpdateManyMutationInput, VoteUncheckedUpdateManyWithoutTVShowInput>
  }

  export type CelebrityCreateWithoutVoteInput = {
    name: string
    description?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type CelebrityUncheckedCreateWithoutVoteInput = {
    id?: number
    name: string
    description?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type CelebrityCreateOrConnectWithoutVoteInput = {
    where: CelebrityWhereUniqueInput
    create: XOR<CelebrityCreateWithoutVoteInput, CelebrityUncheckedCreateWithoutVoteInput>
  }

  export type TVShowCreateWithoutVoteInput = {
    title: string
    description?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type TVShowUncheckedCreateWithoutVoteInput = {
    id?: number
    title: string
    description?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type TVShowCreateOrConnectWithoutVoteInput = {
    where: TVShowWhereUniqueInput
    create: XOR<TVShowCreateWithoutVoteInput, TVShowUncheckedCreateWithoutVoteInput>
  }

  export type CelebrityUpsertWithoutVoteInput = {
    update: XOR<CelebrityUpdateWithoutVoteInput, CelebrityUncheckedUpdateWithoutVoteInput>
    create: XOR<CelebrityCreateWithoutVoteInput, CelebrityUncheckedCreateWithoutVoteInput>
    where?: CelebrityWhereInput
  }

  export type CelebrityUpdateToOneWithWhereWithoutVoteInput = {
    where?: CelebrityWhereInput
    data: XOR<CelebrityUpdateWithoutVoteInput, CelebrityUncheckedUpdateWithoutVoteInput>
  }

  export type CelebrityUpdateWithoutVoteInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CelebrityUncheckedUpdateWithoutVoteInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TVShowUpsertWithoutVoteInput = {
    update: XOR<TVShowUpdateWithoutVoteInput, TVShowUncheckedUpdateWithoutVoteInput>
    create: XOR<TVShowCreateWithoutVoteInput, TVShowUncheckedCreateWithoutVoteInput>
    where?: TVShowWhereInput
  }

  export type TVShowUpdateToOneWithWhereWithoutVoteInput = {
    where?: TVShowWhereInput
    data: XOR<TVShowUpdateWithoutVoteInput, TVShowUncheckedUpdateWithoutVoteInput>
  }

  export type TVShowUpdateWithoutVoteInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TVShowUncheckedUpdateWithoutVoteInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteCreateManyCelebrityInput = {
    id?: number
    tvShowId?: number | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type VoteUpdateWithoutCelebrityInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    TVShow?: TVShowUpdateOneWithoutVoteNestedInput
  }

  export type VoteUncheckedUpdateWithoutCelebrityInput = {
    id?: IntFieldUpdateOperationsInput | number
    tvShowId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteUncheckedUpdateManyWithoutCelebrityInput = {
    id?: IntFieldUpdateOperationsInput | number
    tvShowId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteCreateManyTVShowInput = {
    id?: number
    celebrityId?: number | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type VoteUpdateWithoutTVShowInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Celebrity?: CelebrityUpdateOneWithoutVoteNestedInput
  }

  export type VoteUncheckedUpdateWithoutTVShowInput = {
    id?: IntFieldUpdateOperationsInput | number
    celebrityId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteUncheckedUpdateManyWithoutTVShowInput = {
    id?: IntFieldUpdateOperationsInput | number
    celebrityId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}