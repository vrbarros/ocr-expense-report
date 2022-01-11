function getExpenseRow(LineItemExpenseField, obj) {
  const { Type, ValueDetection } = LineItemExpenseField;

  obj[Type.Text] = ValueDetection.Text;

  return LineItemExpenseField;
}

function getReceiptText(result) {
  const { SummaryFields, LineItemGroups } = result;

  const newObj = {
    officialName: '',
    total: 0,
    items: '',
  };

  if (LineItemGroups) {
    const [Group1] = LineItemGroups;

    if (Group1) {
      const { LineItems } = Group1;

      LineItems.map((LineItem) => {
        const { LineItemExpenseFields } = LineItem;

        if (LineItemExpenseFields) {
          const LineItemExpense = {};

          LineItemExpenseFields.map((LineItemExpenseField) =>
            getExpenseRow(LineItemExpenseField, LineItemExpense)
          );

          const newItem = `${LineItemExpense.ITEM} -- ${LineItemExpense.QUANTITY} -- ${LineItemExpense.PRICE}`;

          newObj.items = `${newObj.items}${newItem}\n`;
        }
      });
    }
  }

  if (SummaryFields) {
    SummaryFields.map((line) => {
      if (line.Type?.Text === 'VENDOR_NAME') {
        newObj.officialName = line.ValueDetection.Text;
      }
      if (line.Type?.Text === 'TOTAL') {
        newObj.total = Number(line.ValueDetection.Text.replace(',', '.'));
      }

      if (line.LabelDetection?.Text?.includes('TOTAL')) {
        newObj.total = Number(line.ValueDetection.Text.replace(',', '.'));
      }
    });
  }

  return newObj;
}

export default getReceiptText;
