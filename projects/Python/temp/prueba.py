import ast




def recursive_int_to_string(var):
    result={}
    if type(var)== dict:
        for key in var.keys():
            result[str(key)]=recursive_int_to_string(var[key])
        else:
            return var
        return result


string= '{"acList":{0:{"sequence":{1:{"counterData"}}}}}'
print(string)   
dictionary=ast.literal_eval(string)
dictionary=recursiveIntToString(dictionary)
print(dictionary)