/**
 * https://www.w3.org/TR/clipboard-apis/#the-paste-action
 * setData() from a paste event handler will not modify the data that is inserted
 * and not modify the data on the clipboard.
 * */

/**
 * =====================  unicode  =====================
 * \u0085 表示下一行的字符
 * \u2028 表示一个行分隔符
 * \u2029 表示一个分段符
 * */

/**
 * =====================  正则  =====================
 * \n 匹配一个换行符
 * \r 匹配一个回车符
 * \t 匹配一个制表符
 * */

/**
 *  | Name         | Title    | age |
 *  |--------------|----------|-----|
 *  | Zhangjintao  | farmer   | 66  |
 *  | Huanghongrui | worker   | 55  |
 *  | Liuchang     | landlord | 44  |
 * */

const editor = document.getElementById("editor");

const columnWidth = (rows, columnIndex) => {
    return Math.max.apply(null, rows.map(function (row) {
        return row[columnIndex].length
    }))
};


editor.addEventListener("paste", event => {
    event.preventDefault();
    const clipboard = event.clipboardData;
    const data = clipboard.getData('text/plain').trim();
    const rows = data.split((/[\n\u0085\u2028\u2029]|\r\n?/g)).map(row => {return row.split("\t")});
    const columnWidths = rows[0].map((column, columnIndex) => {
        // console.log(rows)
        return columnWidth(rows, columnIndex)
    });

    const markdownRows = rows.map((row, rowIndex) => {
        return "| " + row.map((column, index) => {
            return column + Array(columnWidths[index] - column.length + 1).join(" ")
        }).join(" | ") + " |";
    });

    markdownRows.splice(1, 0, "|" + columnWidths.map((width, index) => {
        return Array(columnWidths[index] + 3).join("-")
    }).join("|") + "|");

    event.target.value = markdownRows.join("\n");

    return false
});