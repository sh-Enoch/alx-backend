I18n and L10n - internationaliztion and localization
make application friendly to people who do not speak english
translation workflow

Flask-babel - makes working with translations easy
translate apps into spanish

Babel instance is initialized as a locale_selector argument
it must be a set of function that wi be invoked for each request
The function can look at the request and pick best translation to use for the request
from flask import request
# ...
from flask_babel import Babel

def get_locale():
    return request.accept_languages.best_match(app.config['LANGUAGES'])

app = Flask(__name__)
# ...
babel = Babel(app, locale_selector=get_locale)
# ...

_() - mark texts to translate
_('User %(uname)s not found.'uname=username)
lazy_gettext as _1() help translate string literals.

pybabel to extract marked text to a .pot file
pot - portable object tamplate
pot text file with akk the texts narked as needing translation
pot purpose is to serve as a template  to create translation files for each language.

extraction process
    small configuration file to tell pybabel what files should be scanned for translatable texts.
    babel.cfg
        [python: app/**.py]
        [jinja2: app/templates/**.html]

    extract to a .pot file 
        pybabel extract -F babel.cfg -k _1 -o messages.pot

Generating language catalogue
create translation for each language that will be supported in addition to the base one

to add spanish
    pybabel init -i messags.pot -d app/translations -1 es 
    creating catalog app/translations/es/LC_MESSAGES/messages.po based on messages.pot

pybabel init 
    takes messages.pot file as input and writes 

messages.po 
    source file for trnaslations
    to use translated text  compile file into a format that is efficient
    pybabel.compile
        pybabel compile -d app/translations 
        compiling catalog app/translations/es/LC_MESSAGES/messages.po to
        app/translations/es/LC_MESSAGES/messages.mo
    operation adds messages.mo file next to messages.po in each language repo
    .mo is the file that Flask-Babel will use to load translations for the application.

updating translations
    you want to start to use translation file even if it is incomplete.
    you can compile an incomplete messages.po any available transaltions will be used
    missing ones will use base language
    work on the translations and compile again to update the messages.mo file
    add _() and _1() wrappers when you detect texts haven't been marked

    update procedure:
        pybabel extract -F babel.cfg -k _l -o messages.pot .
        pybabel update -i messages.pot -d app/translations

    extract - genarates a new version of messages.pot and all previous text and anythong new
    update - takes the new mesaages.pot file and merges it into messages.po files associated with the project.
    after messages.po is updated translate new text then compile the messages one more time to make them available to the application

Translating Dates and Times
Flask-Babel returns the selected language and locale for a given request via get_locale() 
