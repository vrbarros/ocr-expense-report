function getReceiptText(summaryFields) {
  const newObj = {
    officialName: '',
    total: 0,
  };

  summaryFields.map((line) => {
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

  return newObj;
}

export default getReceiptText;
