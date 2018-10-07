enuclit set account permission enumivopixel  active '{"threshold":1,"keys":[{"key":"ENU7yAAcrYFZwavaPkH8oHdV3yp7TFsdesdaqFn4324EBtvePMiK6","weight":1}],"accounts":[{"permission":{"actor":"enumivopixel","permission":"enumivo.code"},"weight":1}]}' owner -p enumivopixel@active

enuclit set contract enumivopixel EOSPixels/

enuclit push action enumivopixel init '[]' -p enumivopixel@active
