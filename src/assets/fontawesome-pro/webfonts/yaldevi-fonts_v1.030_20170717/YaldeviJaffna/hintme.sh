for filename in *.ttf
do
    ttfautohint -n "${filename}" "../${filename}"
done
