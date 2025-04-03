#!/bin/sh

LOWERCASE_LETTERS="abcdefghijklmnopqrstuvwxyz"
UPPERCASE_LETTERS="ABCDEFGHIJKLMNOPQRSTUVWXYZ"

echo "type ConvertLowerToUpper<T extends LowercaseLetters>
  = T extends \"a\" ? \"A\" : T extends \"b\" ? \"B\" :"

for ((i=2; i<=${#LOWERCASE_LETTERS}-1; i+=2)); do
  echo "    T extends \"${LOWERCASE_LETTERS:i:1}\" ? \"${UPPERCASE_LETTERS:i:1}\" : \
T extends \"${LOWERCASE_LETTERS:i+1:1}\" ? \"${UPPERCASE_LETTERS:i+1:1}\" :"
done

echo "    never;"