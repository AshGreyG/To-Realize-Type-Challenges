LOWERCASE_LETTERS="abcdefghijklmnopqrstuvwxyz"
UPPERCASE_LETTERS="ABCDEFGHIJKLMNOPQRSTUVWXYZ"

echo "type ConvertUpperToLower<T extends UppercaseLetters>
  = T extends \"A\" ? \"a\" : T extends \"B\" ? \"b\" :"

for ((i=2; i<=${#LOWERCASE_LETTERS}-1; i+=2)); do
  echo "    T extends \"${UPPERCASE_LETTERS:i:1}\" ? \"${LOWERCASE_LETTERS:i:1}\" : \
T extends \"${UPPERCASE_LETTERS:i+1:1}\" ? \"${LOWERCASE_LETTERS:i+1:1}\" :"
done

echo "    never;"