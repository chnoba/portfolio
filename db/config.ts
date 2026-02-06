import { defineDb, defineTable, column } from 'astro:db';

const Radio = defineTable({
    columns: {
        id: column.text({ primaryKey: true }),
        title: column.text(),
        thumbnail: column.text(), // Nueva columna para la carátula
        genre: column.text(),
    }
});

export default defineDb({
    tables: { Radio },
});