#!/bin/bash

for i in $( find -iname '*.irrmesh' -or -iname '*.irr'); do
    if [ "$( file -b $i)" == 'XML document text' ]
    then
        echo skipping: $i
    else 
        #iconv -f UTF-16 -t UTF-8 3.irrmesh -o 3.irrmesh
        echo iconv -f UTF-16 -t UTF-8 $i -o $i
        iconv -f UTF-16 -t UTF-8 $i -o $i.tmp
        mv $i.tmp $i
    fi
done
