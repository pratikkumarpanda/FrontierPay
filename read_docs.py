import pandas as pd
from docx import Document

# Read Excel
excel_file = r"C:\Users\aakas\Downloads\FrontierPay_Conversion_Engine_v3_MultiCurrency (1).xlsx"
try:
    df = pd.read_excel(excel_file, sheet_name=None)
    with open('excel_out.txt', 'w', encoding='utf-8') as f:
        for sheet_name, sheet_df in df.items():
            f.write(f"=== Sheet: {sheet_name} ===\n")
            f.write(sheet_df.to_string())
            f.write("\n\n")
    print("Excel file processed.")
except Exception as e:
    print(f"Error processing Excel: {e}")

# Read Word
word_file = r"C:\Users\aakas\Downloads\Capstone Project Proposal-frontierpay(final) (1) (1).docx"
try:
    doc = Document(word_file)
    with open('word_out.txt', 'w', encoding='utf-8') as f:
        for para in doc.paragraphs:
            f.write(para.text + "\n")
    print("Word file processed.")
except Exception as e:
    print(f"Error processing Word: {e}")
