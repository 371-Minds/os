let data: Record<string, any[]> = {};

export async function connectToDbMock(uri: string, dbName: string) {
  console.log(`🧪 Using in-memory MongoDB mock for ${dbName}`);
  if (!data[dbName]) data[dbName] = [];
  return {
    collection: (name: string) => ({
      insertOne: async (doc: any) => {
        const id = `${Date.now()}-${Math.random()}`;
        const record = { _id: id, ...doc };
        data[dbName].push(record);
        return { insertedId: id, ...record };
      },
      find: () => ({
        toArray: async () => [...data[dbName]]
      }),
      deleteMany: async () => {
        data[dbName] = [];
        return { deletedCount: 1 };
      }
    })
  };
}
