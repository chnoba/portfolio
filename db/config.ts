import { defineDb, defineTable, column } from 'astro:db';

const Radio = defineTable({
    columns: {
        // Usamos text para poder usar IDs descriptivos como 'flux-main'
        id: column.text({ primaryKey: true }),
        title: column.text(),
        url: column.text(),
        thumbnail: column.text(),
        genre: column.text({ optional: true }),
    }
});

export default defineDb({
    tables: { Radio },
});