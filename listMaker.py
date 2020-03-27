import sys

answer = "["

for x in sys.stdin:
    x=x.strip()
    number,name = x.split(':')

    newName = ""
    for x in name[1:]:
        if x == " ":
            newName += "_"
        elif x == "+":
            newName += "and"
        else:
            newName += x.lower()
            
    number = int(number)
    number = str(number)
    
    newName = number+"-"+newName
    
    answer += "'"+newName+"',"

print(answer)
    
    