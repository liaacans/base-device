# ini cht bot gabut
# bisa jadiin pacar juga lho
# bisa jadiin gabut juga lho
# bisa ketawa sndiri:v
# dll
###################################-+
# author   : aulia rahman                        #-+
# insta    : instagram.com/auliarahman_ckep    #-+
# tiktok   : tiktok.com@liaacans'                 #-+
# whatsapp : 085821676621                       #-+
###################################-+


import re
import random

#Membuat balasan botnya (zahra)
gadaperintah = ["maaf tidak ada perintahnya kak", "gada kata kata itu kak"]
bot = ["hallo juga"]
bot2 = ["hai juga","hay juga"]
nama = ["nama saya zahra"]
kenalan = ["Ayok, namamu siapa ?"]
kenalan2 = ["boleh kok hehe"]
asal = ["saya berasal dari bot", "dari bumi lah banh"]
cipta = ["saya di buat / di ciptakan oleh aulia rahman"]
tempat_tinggal = ["tempat tinggal saya di mesin :)","jangan tanya mulu zahra lagi pms"]
jadi = ["Saya mau menjadi pacarmu kok","ya mau dong hehe","ya mau lah","zahra mau kok","Mau dong"]
kue = ["Saya tidak terlalu mengerti coba lihat di google"]
ganteng = ["Kalo ganteng itu sudah dari bawaan wkwkw"]
rindu = ["tentu saja aku merindukanmu","saya merindukanmu :("]
kangen = ["kangen kepadamu itu adalah kewajibanku :)","Iyaa saya kangen kepadamu","kangen lah :("]
rindu2 = ["jangan rindu kamu gaakan kuat biar zahra saja","zahra juga rindu :("]
crnmbk = ["terus kasih bunga mawar", "gombalin dia sampe baper", "jangan kasih kendor kamu mau jadi pacar dia", "kasih kejutan buat dia biar dia semakin baper", "kasih juga kejutan spesial buat dia"]



#membuat pertanyaan dari user (kita)
#mengambil balasan bot dari atas

while(True):
 user = str(input("[CHAT] ~# : "))
 if re.findall(r"hallo", user):
    print(random.choice(bot))
 elif re.findall(r"hai|hay", user):
    print("zahra : ", random.choice(bot2))
 elif re.findall(r"siapa namamu?|namamu siapa?", user): 
    print("zahra : ", random.choice(nama))
 elif re.findall(r"kenalan yok?|kenalan yuk?", user):
    print("zahra : ", random.choice(kenalan))
 elif re.findall(r"boleh kenalan?|boleh kenalan ga nih?", user):
    print("zahra : ", random.choice(kenalan2))
 elif re.findall(r"darimana asalmu?|asalmu darimana?|dimana asalmu?|asalmu dimana ?|kalo boleh tau asalmu darimana?", user):
    print("zahra : ", random.choice(asal))
 elif re.findall(r"siapa penciptamu?|siapa yang membuat kamu?|siapa pembuatmu?|pembuatmu siapa?|penciptamu siapa?", user):
    print("zahra : ", random.choice(cipta))
 elif re.findall(r"dimana tempat tinggalmu?|dimana tinggalmu|tinggal dimana kamu?|kamu tinggal dimana?|zahra tinggal dimana?|dimana tempat tinggal mu?|dimana tempatmu?", user):
    print("zahra : ", random.choice(tempat_tinggal))
 elif re.findall(r"apakah kau mau menjadi pacarku?|apakah kamu mau menjadi pacarku?|apa kamu mau menjadi pacarku?|kamu mau ga jadi pacarku?|kamu mau jadi pacarku?|kamu mau jadi pacarku?|zahra mau jadi pacarku?|zahra mau ga jadi pacarku?|mau ga jadi pacar aku?", user):
 	  print("zahra : ", random.choice(jadi)) 
 elif re.findall(r"maukah kamu menjadi pacarku?|bagaimana cara membuat kue?|bagaimana cara buat kue?|buat kue gimana ya caranya|cara buat kue gimana|buat kue kek mana ya", user):
    print("zahra : ", random.choice(kue))
 elif re.findall(r"bagaimana cara menjadi ganteng?|cara biar ganteng gimana?|biar ganteng gimana ya?|tutor ganteng dong|caranya ganten gimana?|gimana caranya biar ganteng?|caranya ganteng gimana ya?|caranya ganteng gimana ya cape di hina terus|tutor dong cara jadi ganteng gimana ya?", user):
    print("zahra : ", random.choice(ganteng))
 elif re.findall(r"apakah kamu rindu aku?|apakah kamu merindikanku?|apa kamu merindikanku?|apa lu merindukanku?|apa kamu rindu?|apa kamu rindu aku?|apakah rahman rindu aku?", user):
    print("zahra : ", random.choice(rindu))
 elif re.findall(r"apakah kamu kangen padaku?|apakah kamu kangen kepadaku?|apa rahman kangen ke aku?|apa kamu kangem ke aku?|kamu kangen ga ke aku?|km kngen ga sama aku?", user):
    print("zahra : ", random.choice(kangen))
 elif re.findall(r"aku merindukanmu|aku rindu kamu|aku rindu|aku rindu sama kmu|saya rindu|aku merindukanmu|aju merindukanmu|aku merindukanmu|aku rindu|aku rindu bngt", user):
    print("zahra : ", random.choice(rindu2))
 elif re.findall(r"cara nembak cewe gimna si?|cara nmbak cwe gimana sih?|cara deket cewe gimna ya?|cara nembak cewek?|cara cewek baper gimna sih?", user):
    print("zahra : ", random.choice(crnmbk))
 else:
    print("[ERROR] : ", random.choice(gadaperintah))


#// Subscribe Channel Yt Aulia Rahman Official //#
