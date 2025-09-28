export async function connectToDb(uri: string, dbName: string) {
  return {
    db: {
      collection: (name: string) => ({
        insertOne: async (doc: any) => ({
          insertedId: "mock-id",
          ...doc
        }),
        find: () => ({
          toArray: async () => [{ id: "mock-id", title: "Test Task", completed: false }]
        })
      })
    }
  };
}
