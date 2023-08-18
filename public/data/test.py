data = []

with open('words_alpha.txt', 'r') as f:
	data = f.readlines()

with open('words_lst.txt', 'a') as f:
	for i in data:
		f.write('"' + i.replace('\n', '') + '", ')