var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

       var releases = JSON.parse(xhttp.responseText);

       if(!releases.length) { 
        document.getElementById("latest").innerText(`No releases`)
        document.getElementById("canary").innerText(`No releases`)
        document.getElementById("stable").innerText(`No releases`)
        document.getElementById("random").innerText(`No releases`)
        document.getElementById("off").innerText(`No releases`)
    }
    document.getElementById("random").innerText = `Click for random version`
    document.getElementById("random").className = "otherReleases"
    document.getElementById("random").addEventListener("click", randomizer);
    function randomizer() {
    var randomrelease = releases[Math.floor(Math.random() * releases.length)]

    document.getElementById("random").href = `#${randomrelease.name}`
    }
       
       document.getElementById('off').remove()
       var lastprerelease = releases.find(r => r.prerelease == true)
       var laststablerelease = releases.find(r => r.prerelease == false)
       var lastrelease = releases[0]
       if(lastrelease) {
        document.getElementById("latest").href= `#${lastrelease.name}`
        document.getElementById("latest").innerText= `Latest Release ${lastrelease.name} (${lastrelease.prerelease ? 'Prerelease' : 'Stable'})`
        document.getElementById("latest").className= 'latestButton'
        document.getElementById("latest").className= lastprerelease ? 'canaryButton' : 'stableButton'
       }
       else {document.getElementById("latest").innerText = 'Latest Release Not Present'}
       if(laststablerelease) {
           document.getElementById("stable").href= `#${laststablerelease.name}`
           document.getElementById("stable").innerText= `Stable Release ${laststablerelease.name}`
           document.getElementById("stable").className= 'stableButton'
        }
       else {document.getElementById("stable").innerText = 'Stable Release Not Present'}
       if(lastprerelease) {
           document.getElementById("canary").href= `#${lastprerelease.name}`
           document.getElementById("canary").innerText= `Canary Release ${lastprerelease.name}`
           document.getElementById("canary").className= "canaryButton"
        }
       else {document.getElementById("canary").innerText = 'Canary Release Not Present'}
       
        for(var release in releases) {

            var h4 = document.createElement('h4')
            h4.innerText = `${releases[release].name} - ${releases[release].prerelease ? 'Prerelease' : 'Stable'}`
            document.getElementById("releases").appendChild(h4)

            var rls = document.createElement('a')
            rls.innerText = `Release\n${releases[release].name}`
            rls.id = releases[release].name
            rls.className = 'otherReleases'
            rls.href = releases[release].html_url
            document.getElementById("releases").appendChild(rls)

            var tag = document.createElement('a')
            tag.innerText = `Branch\n${releases[release].tag_name}`
            tag.id = releases[release].name
            tag.className = 'otherReleases'
            tag.href = 'https://github.com/nonoteal/Minecraft-Assets-Ripper/tree/' + releases[release].tag_name
            document.getElementById("releases").appendChild(tag)

            var zip = document.createElement('a')
            zip.innerText = `Zipball Download\n${releases[release].name}`
            zip.id = releases[release].name
            zip.className = 'otherReleases'
            zip.href = releases[release].zipball_url
            document.getElementById("releases").appendChild(zip)

            var tar = document.createElement('a')
            tar.innerText = `Tarball Download\n${releases[release].name}`
            tar.id = releases[release].name
            tar.className = 'otherReleases'
            tar.href = releases[release].tarball_url
            document.getElementById("releases").appendChild(tar)

            var readme = document.createElement('a')
            readme.innerText = `README.md\n(Helpful)`
            readme.id = releases[release].name
            readme.className = 'readme'
            readme.href = `https://github.com/NoNoTeal/minecraft-assets-ripper/blob/${releases[release].tag_name}/README.md`
            document.getElementById("releases").appendChild(readme)
        }
    }
};
xhttp.open("GET", "https://api.github.com/repos/nonoteal/Minecraft-Assets-Ripper/releases", true);
xhttp.send();

var xhttp2 = new XMLHttpRequest();
xhttp2.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var repoinfo = JSON.parse(xhttp2.responseText)
        document.getElementById('starus').innerText= `${repoinfo.stargazers_count} stargazers`
        document.getElementById('issues').innerText= `${repoinfo.open_issues_count} issues open`
        document.getElementById('watchers').innerText= `${repoinfo.subscribers_count} watchers`
        document.getElementById('forkers').innerText= `${repoinfo.forks} forkers`
    }
}
xhttp2.open("GET", "https://api.github.com/repos/nonoteal/Minecraft-Assets-Ripper", true);
xhttp2.send();
