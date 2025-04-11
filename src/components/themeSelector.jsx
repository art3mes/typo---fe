import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import { useQuery } from '@tanstack/react-query'
import { Check, Loader2, Palette, Search } from 'lucide-react'
import Fuse from 'fuse.js'

import { formatThemeName, previewTheme, stopPreviewingTheme } from '@/utils/theme.utils'
import { clamp } from '@/utils/math.utils'
import { debounce } from '@/utils/helpers'
import { AppStore } from '../state/app.store'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { For } from './map'
import { cn } from '../utils/classnames.utils'

const DIRECTION_MAP = {
    ArrowUp: -1,
    ArrowDown: 1,
}

const debouncedPreviewTheme = debounce(previewTheme, 100)

const useThemes = (opts = {}) => {
    return useQuery({
        queryKey: ['theme-list'],
        queryFn: () =>
            import('@/styles/theme-list.json').then((m) => m.default),
        ...opts,
    })
}

export const ThemeSwitcherList = () => {
    const { data: themes = [], isLoading: isThemesLoading } = useThemes()
    const fuse = useMemo(() => new Fuse(themes, {
        keys: ['name', 'id'],
        threshold: 0.4,
    }), [themes])

    const scrollerRef = useRef(null)

    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [isHoverDisabled, setIsHoverDisabled] = useState(false)

    const { theme: appliedTheme } = AppStore.useStore('theme')
    const [previewedTheme, setPreviewedTheme] = useState(appliedTheme)

    const filteredThemes = useMemo(() => {
        if (!search) return themes
        return fuse.search(search).map(result => result.item)
    }, [search, themes])

    const updateTheme = () => AppStore.set({ theme: previewedTheme })

    const handleKeyboardNavigation = (e) => {
        if (!(e.key in DIRECTION_MAP) || filteredThemes.length === 0) return

        setPreviewedTheme(prev => {
            const currIdx = filteredThemes.findIndex(t => t.name === prev)
            if (currIdx === -1) return prev

            const newIdx = clamp(0, currIdx + DIRECTION_MAP[e.key], filteredThemes.length - 1)
            const newTheme = filteredThemes[newIdx]
            setIsHoverDisabled(true)

            document.getElementById(`style-${newTheme.id}`)?.scrollIntoView({
                block: 'nearest',
                inline: 'nearest',
            })

            return newTheme.name
        })

        if (e.key === 'Enter') updateTheme()
    }

    useEffect(() => {
        if (!isOpen) return
        const enableHover = () => setIsHoverDisabled(false)

        document.addEventListener('mousemove', enableHover)
        document.addEventListener('keydown', handleKeyboardNavigation)
        return () => {
            document.removeEventListener('mousemove', enableHover)
            document.removeEventListener('keydown', handleKeyboardNavigation)
        }
    }, [isOpen, filteredThemes])

    useEffect(() => {
        if (isOpen && filteredThemes.length > 0) {
            setPreviewedTheme(filteredThemes[0].name)
        }
    }, [filteredThemes, isOpen])

    useEffect(() => {
        debouncedPreviewTheme(previewedTheme)
    }, [previewedTheme])

    const renderThemeItem = useCallback((theme) => {
        if (!theme) return null

        const { id, name, mainColor, textColor, subColor } = theme
        const isFocused = name === previewedTheme
        const isCurrent = name === appliedTheme

        return (
            <div
                key={id}
                id={`style-${id}`}
                onMouseEnter={() => !isHoverDisabled && setPreviewedTheme(name)}
                onClick={updateTheme}
                className={cn(
                    'flex cursor-pointer items-center justify-between rounded-sm border border-transparent px-2 py-1 text-foreground',
                    isCurrent && 'border-primary/50 bg-primary/20 shadow-md',
                    isFocused && 'bg-foreground/20'
                )}
            >
                <p className={cn(isCurrent && 'flex items-center gap-1')}>
                    {isCurrent ? (
                        <Check className="-mb-1 h-4 w-4" />
                    ) : (
                        <span className="mr-1 text-xs text-muted-foreground">{id}.</span>
                    )}
                    {formatThemeName(name)}
                </p>
                <div className="flex gap-1">
                    <For each={[mainColor, textColor, subColor]}>
                        {(color, i) => (
                            <div
                                key={i}
                                style={{ backgroundColor: color }}
                                className="h-3 w-3 rounded-full border border-foreground"
                            />
                        )}
                    </For>
                </div>
            </div>
        )
    }, [previewedTheme, appliedTheme, isHoverDisabled])

    return (
        <Dialog
            onOpenChange={(open) => {
                setIsOpen(open)
                if (!open) stopPreviewingTheme()
            }}
        >
            <DialogTrigger asChild>
                <Button variant="ghost" className="h-fit gap-1 text-xs text-muted-foreground">
                    <Palette className="h-3 w-3" />
                    {appliedTheme}
                </Button>
            </DialogTrigger>
            <DialogContent className="flex h-fit max-h-[80%] min-w-full flex-col overflow-hidden sm:min-w-[80%]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Themes</DialogTitle>
                    <DialogDescription>
                        Select a theme to change the color scheme of the app.
                        <br />
                        You can also search for a theme by name or index.
                    </DialogDescription>
                </DialogHeader>

                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    startIcon={<Search className="h-4 w-4" />}
                    placeholder="Search"
                    className="bg w-full border border-border"
                />

                <div
                    ref={scrollerRef}
                    className="scroll flex flex-col gap-1 overflow-y-auto"
                >
                    <For
                        each={filteredThemes}
                        whenEmpty={
                            isThemesLoading ? (
                                <Loader2 className="size-5 animate-spin" />
                            ) : (
                                <h2 className="px-2 font-bold">No themes found :(</h2>
                            )
                        }
                    >
                        {renderThemeItem}
                    </For>
                </div>
            </DialogContent>
        </Dialog>
    )
}
